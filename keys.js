//console.log("keys are loaded !!!\n");
// console.log(process.env.SPOTIFY_ID);
// console.log(process.env.SPOTIFY_SECRET);
exports.keys = {
  spoId: process.env.SPOTIFY_ID,
  spoSecret: process.env.SPOTIFY_SECRET,
  bandInTown: process.env.BANDSINTOEN_API,
  omdb: process.env.OMDB_API
};
