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
    const {searchTerm} = this.state;
    return (
      <div>
        <input
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => this.setStateHandler(e)}
            type="text"
            name="searchTerm"
        />
      </div>
    );
  }
}

export default Search;
