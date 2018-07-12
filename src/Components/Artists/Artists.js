import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Artist extends Component {
  constructor() {
    super();
    this.state = {
      artistsList: []
    };
  }
  // getArtists = () => {
  //   spotifyApi.getArtists("6rqhFgbbKwnb9MLmUQDhG6").then(response => {
  //     console.log(response);
  //   });
  // };
  // componentDidMount() {
  //   this.getArtists();
  // }

  render() {
    return <div>Artist List</div>;
  }
}

export default Artist;
