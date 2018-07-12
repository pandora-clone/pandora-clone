import React, { Component } from "react";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Home extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      name: "Not Checked",
      albumArt: "",
      songs: [],
      playlist: [],
      newReleases: []
    };
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

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
  getCategories = () => {
    spotifyApi.getCategories().then(response => {
      console.log(response);
    });
  };

  getTracks = () => {
    spotifyApi.searchTracks("gravity").then(response => {
      console.log(response);
      this.setState({
        songs: response.tracks.items
      });
    });
  };

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      console.log(response);
      this.setState({
        name: response.item.name,
        albumArt: response.item.album.images[0].url
      });
    });
  }

  componentDidMount() {
    this.getNewReleases();
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
    // const playlistToDisplay = this.state.playlist.map((song, i) => {
    //   return (
    //     <div key={i}>
    //       <p>
    //         {song.track.name} by {song.track.artists[0].name}
    //       </p>
    //     </div>
    //   );
    // });
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
        {/* <div>Now Playing: {this.state.name}</div>
        <div>
          <img
            src={this.state.albumArt}
            style={{ height: 150 }}
            alt={this.state.name}
          />
        </div> */}

        {/* {playlistToDisplay} */}

        {this.state.loggedIn && (
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        )}

        {this.state.loggedIn && (
          <button onClick={() => this.getTracks()}>Get Song</button>
        )}
        {this.state.loggedIn && (
          <button onClick={() => this.getMe()}>Get Test</button>
        )}
        {newReleasesToDisplay}

        {songsToDisplay}
      </div>
    );
  }
}

export default Home;
