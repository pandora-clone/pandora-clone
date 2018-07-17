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
          <div className="albumImage">
            <img
            src={album.images[1].url}
            style={{ width: "100%" }}
            />
          </div>
          <div className="albumName">
            <span>{album.artists[0].name}</span>
          </div>
        </div>
      );
    });
    return (
      <div className="albumWrapper">
        {albumsToDisplay}
      </div>
    );
  }
}

export default Albums;
