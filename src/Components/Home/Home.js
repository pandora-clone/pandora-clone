import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth, database } from "../../firebase/firebase";
import pick from "lodash/pick";

import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();
class Home extends Component {
  constructor() {
    super();
    this.usersRef = null;
    this.userRef = null;
    // const params = this.getHashParams();
    // const token = params.access_token;
    // if (token) {
    //   spotifyApi.setAccessToken(token);
    // }
    this.state = {
      // loggedIn: token ? true : false,
      categories: {},
      name: "Not Checked",
      albumArt: "",
      songs: [],
      playlist: [],
      newReleases: [],
      user: null,
      users: {}
    };

    this.usersRef = database.ref("/users");
    this.getCategories = this.getCategories.bind(this);
  }
  // getHashParams() {
  //   var hashParams = {};
  //   var e,
  //     r = /([^&;=]+)=?([^&;]*)/g,
  //     q = window.location.hash.substring(1);
  //   e = r.exec(q);
  //   while (e) {
  //     hashParams[e[1]] = decodeURIComponent(e[2]);
  //     e = r.exec(q);
  //   }
  //   return hashParams;
  // }

  // getPlaylist = () => {
  //   spotifyApi
  //     .getPlaylist("jmperezperez", "4vHIKV7j4QcZwgzGQcZg1x")
  //     .then(response => {
  //       console.log(response);
  //       this.setState({
  //         playlist: response.tracks.items
  //       });
  //     });
  // };

  // getGenre = () => {
  //   spotifyApi.getAvailableGenreSeeds().then(response => {
  //     console.log(response);
  //   });
  // };
  getMe = () => {
    spotifyApi.getMe().then(response => {
      console.log(response);

      // database
      //   .ref()
      //   .child(response.id)
      //   .push(response.id);

      // if (response) {
      //   this.setState({
      //     user: response
      //   });
      //   this.usersRef = database.ref("/users");
      //   this.userRef = this.usersRef.child(this.state.user.id);

      //   this.userRef.once("value").then(snapshot => {
      //     if (snapshot.val()) return;
      //     const userData = pick(response, ["id", "display_name", "email"]);
      //     this.userRef.set(pick(userData));
      //   });
      //   this.usersRef.on("value", snapshot => {
      //     this.setState({ users: snapshot.val() });
      //   });
      // }
    });
  };

  getNewReleases = () => {
    spotifyApi.getNewReleases().then(response => {
      // console.log(response);
      this.setState({
        newReleases: response.albums.items
      });
    });
  };

  getCategories() {
    spotifyApi.getCategories({ limit: 40 }).then(response => {
      // console.log("Categories", response.categories.items);
      this.setState({ categories: response.categories.items });
    });
  }

  getTracks = () => {
    spotifyApi.searchTracks("gravity").then(response => {
      // console.log(response);
      this.setState({
        songs: response.tracks.items
      });
    });
  };

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      // console.log(response);
      this.setState({
        name: response.item.name,
        albumArt: response.item.album.images[0].url
      });
    });
  }

  componentDidMount() {
    this.getNewReleases();
    this.getCategories();
    this.getMe();
    database.ref().on("value", snapshot => {
      console.log("Data Has Changed", snapshot.val());
    });
  }

  render() {
    // console.log(this.state.loggedIn);

    const newReleasesToDisplay = this.state.newReleases.map((song, i) => {
      return (
        <div key={i}>
          <img src={song.images[1].url} alt={song.name} />

          <p>{song.name}</p>
        </div>
      );
    });
    const playlistToDisplay = this.state.playlist.map((song, i) => {
      return (
        <div key={i}>
          <p>
            {song.track.name} by {song.track.artists[0].name}
          </p>
        </div>
      );
    });
    const songsToDisplay = this.state.songs.map((song, i) => {
      return (
        <div key={i}>
          <p>
            {song.name} by {song.artists[0].name}
          </p>

          <audio controls>
            <source src={song.preview_url} type="audio/mpeg" />
          </audio>
        </div>
      );
    });

    return (
      <div>
        <button className="category" onClick={() => this.getCategories()}>
          Get Categories
        </button>

        {this.state.loggedIn && (
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        )}

        <div className="category-wrapper">
          {this.state.categories[0] &&
            this.state.categories.map((category, i) => {
              return (
                <div className="home-image-container" key={i}>
                  <Link to={"/genre/" + category.id}>
                    <img
                      src={category.icons[0].url}
                      style={{ width: "100%" }}
                      alt=""
                    />
                  </Link>
                  <div className="category-text">
                    <h2>{category.name}</h2>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Home;
