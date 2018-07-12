import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Search extends Component {
<<<<<<< HEAD
    constructor(props){
      super(props);
      this.state = {
          searchParams: ''

      }
  }
  setStateHandler = e => {
    this.setState({searchParams: e.target.value})
  };
=======
  constructor() {
    super();
    this.state = {
      searchTerm: ""
    };
  }
  search = () => {};
>>>>>>> master
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
