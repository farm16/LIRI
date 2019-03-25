require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const api = require("./keys.js");
const Spotify = require("node-spotify-api");

//APIs keys
let bandsintownAPI = api.keys.bandintown;
let spotifyAPI_id = api.keys.spoId;
let spotifyAPI_secret = api.keys.spoSecret;
let omdbAPI = api.keys.omdb;

//API calls functions
async function getEvent(artist_name) {
  try {
    const response = await axios.get(
      `https://rest.bandsintown.com/artists/${artist_name.replace(
        / /g,
        ""
      )}/events?app_id=${bandsintownAPI}`
    );
    let event_info = {
      venue: response.data[0].venue,
      datetime: response.data[0].datetime
    };
    console.log(event_info);
    console.log("=".repeat(70));
    //return event_info;
  } catch (error) {
    console.log("No concerts .... sorry =(");
    //console.error(error);
  }
}

function getSong(song_name) {
  let spotify = new Spotify({
    id: spotifyAPI_id,
    secret: spotifyAPI_secret
  });
  spotify
    .search({ type: "track", query: song_name })
    .then(data => {
      let info = data.tracks.items[0];
      let localObj = {
        artistName: info.artists[0].name,
        albumName: info.album.name
      };
      return localObj;
    })
    .then(localObj => {
      console.log(localObj);
      console.log("=".repeat(70));
    })
    .catch(err => {
      console.log(err);
    });
}

//http://www.omdbapi.com/?t=the+avengers&apikey=4c42706e

function getMovie(movieName) {
  axios
    .get(
      `https://www.omdbapi.com/?t=${movieName
        .split(" ")
        .join("+")}&apikey=${omdbAPI}`
    )
    .then(function(response) {
      let info = response.data;
      //console.log(info);
      if (info.Response === "True") {
        return info;
      } else {
        getMovie("Mr. Nobody");
      }
    })
    .then(function(info) {
      let localObj = {
        title: info.Title,
        year: info.Year,
        rating: info.Ratings,
        countryProduction: info.Country,
        language: info.Language,
        plot: info.Plot,
        actors: info.Actors
      };
      console.log(localObj);
      console.log("=".repeat(70));
    })
    .catch(function(error) {
      console.log(error);
    });
}

function getTxt() {
  arr = fs
    .readFileSync("random.txt")
    .toString()
    .replace(/"/g, "")
    .split("\n");
  let array = [];
  for (i in arr) {
    let tmpArr = arr[i].split(",");
    let cmds = { cmd: tmpArr[0], val: tmpArr[1] };
    array.push(cmds);
  }
  for (j in array) {
    switch (array[j].cmd) {
      case "spotify-this-song":
        getSong(array[j].val);
        break;
      case "concert-this":
        getEvent(array[j].val);
        break;
      case "movie-this":
        getMovie(array[j].val);
        break;
    }
  }
}

//function getInput() {
// for (i in process.argv) {
let tmpVal = "";
switch (process.argv[2]) {
  case "spotify-this-song":
    for (let i = 3; i < process.argv.length; i++) {
      tmpVal += `${process.argv[i]} `;
    }
    getSong(tmpVal);
    break;
  case "concert-this":
    for (let i = 3; i < process.argv.length; i++) {
      tmpVal += `${process.argv[i]} `;
    }
    console.log(tmpVal);
    getEvent(tmpVal);
    break;
  case "movie-this":
    for (let i = 3; i < process.argv.length; i++) {
      tmpVal += `${process.argv[i]} `;
    }
    getMovie(tmpVal);
    break;
  case "do-what-it-says":
    getTxt();
    break;
}
//}
//}

// let artist = "legado7";
// let song = "El Chinito";
// let movie = "The Avengers";

//getInput();

//console.log(process.argv);
// getEvent(artist);
// getSong(song);
// getMovie(movie);
//getTxt();
