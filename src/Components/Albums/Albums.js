import React, { Component } from "react";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Albums extends Component {
  constructor() {
    super();
    this.state = {
      albums: []
    };
  }

  getAlbums = () => {
    spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(response => {
      console.log(response);
      this.setState({
        albums: response.items
      });
    });
  };
  componentDidMount() {
    this.getAlbums();
  }

  render() {
    const albumsToDisplay = this.state.albums.map((album, i) => {
      return (
        <div key={i}>
          <img src={album.images[1].url} />

          <p> {album.artists[0].name}</p>
        </div>
      );
    });
    return <div>{albumsToDisplay}</div>;
  }
}

export default Albums;
