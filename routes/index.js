const { Router } = require("express");
const router = Router();
const SpotifyWebApi = require("spotify-web-api-node");

// setting the spotify-api

const clientId = "de272c3c0e364a88b8fd67de764e68d5",
  clientSecret = "311935caf3f341f688b242404c7895eb";

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body["access_token"]);
  })
  .catch(error => {
    console.log("Something went wrong when retrieving an access token", error);
  });

router.get("/", (req, res, next) => {
  res.render("index");
});

// Retrieve 5 new releases, this will give the releases with whole information
router.get("/newreleases", (req, res, next) => {
  spotifyApi
    .getNewReleases({ limit: 5 })
    .then(data => {
      res.json(data.body.albums.items);
      // console.log(data.body.albums.items[0].artists[0].name);
    })
    .catch(error => {
      console.log("Error while retrieving: ", error);
    });
});

// Get the artist's top/popular tracks
router.get("/artist/:id", (req, res, next) => {
  spotifyApi
    .getArtistTopTracks(req.params.id, "GB")
    .then(data => {
      const sortedSongs = data.body.tracks.sort((a, b) =>
        a.popularity > b.popularity ? -1 : 1
      );
      res.json(sortedSongs[0]);
      console.log(sortedSongs[0]);
    })
    .catch(error => {
      console.log("Error while retrieving: ", error);
    });
});

module.exports = router;
