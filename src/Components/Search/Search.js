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
    const {searchParams} = this.state;
    return (
      <div>
        <input
            placeholder="Search here..."
            value={searchParams}
            onChange={(e) => this.setStateHandler(e)}
            type="text"
            name="searchParams"
        />
        this is Search page
      </div>
    );
  }
}

export default Search;
