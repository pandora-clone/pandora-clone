import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ""
    };
  }
  search = () => {};
  render() {
    return (
      <div>
        <input />
        this is Search page
      </div>
    );
  }
}

export default Search;
