require("dotenv").config();
const express = require("express"); // Express web server framework
const request = require("request"); // "Request" library
const cors = require("cors");
const { json } = require("body-parser");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const massive = require("massive");
const session = require("express-session");
const port = process.env.PORT || 8888;

const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirect_uri = "http://localhost:8888/callback"; // Your redirect uri

const checkForPlayList = require(`${__dirname}/middlewares/checkForPlayList`);
const checkForUser = require(`${__dirname}/middlewares/checkForUser`);
const {
  getFavList,
  addFavList,
  deleteFavList
} = require(`${__dirname}/controllers/favListCtrl`);
const {
  getRctPlay,
  addRctPlayed
} = require(`${__dirname}/controllers/rctPlayedCtrl`);
const {
  login,
  // register,
  getUser,
  logout
} = require(`${__dirname}/controllers/userCtrl`);
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(cookieParser());
app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);
app.use(checkForPlayList);
app.use(checkForUser);

massive(process.env.CONNECTION_STRING)
  .then(db => {
    console.log("database is connecting");
    app.set("db", db);
  })
  .catch(err => {
    // app.set("db", db);
    console.log(err);
  });

app.get("/login", function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-read-private user-read-email user-read-playback-state";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

app.get("/logout", function(req, res) {
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/");
  });
});

app.get("/callback", function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch"
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64")
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          // console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "http://localhost:3000/#" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            })
        );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token"
            })
        );
      }
    });
  }
});

app.get("/refresh_token", function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
});

//endpoints
app.get("/api/fav/:id", getFavList);
app.post("/api/fav/new", addFavList);
app.delete("/api/fav/:id", deleteFavList);

//recently played
app.get("/api/recent", getRctPlay);
app.post("/api/recent", addRctPlayed);

//users
app.get("/api/users", getUser);
app.post("/api/login", login);
// app.post("/api/register", register);
app.post("/api/logout", logout);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
