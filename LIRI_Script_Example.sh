#!/bin/bash          
            STR="Setting Local Variables"

            export SPOTIFY_ID
            export SPOTIFY_SECRET
            export BANDSINTOEN_API
            export OMDB_API

            SPOTIFY_ID={YOU API KEY HERE (input without -> "" )}
            SPOTIFY_SECRET={YOU API KEY HERE (input without -> "" )}
            BANDSINTOEN_API={YOU API KEY HERE (input without -> "" )}
            OMDB_API={YOU API KEY HERE (input without -> "" )}

            echo -e "\n======================" $STR "======================\n"
            echo -e "SPOTIFY_ID\nSPOTIFY_SECRET\nBANDSINTOEN_API\nOMDB_API\n"

            cmds=("liri.js concert-this daddy yankee" "liri.js spotify-this-song thotiana" "liri.js movie-this the avengers" "liri.js do-what-it-says")
             for i in "${cmds[@]}"
              do 
                echo -e "\n======================================================================\n"
                echo -e "Running --> node " $i "\n"
                node $i 
              done        
