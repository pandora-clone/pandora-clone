import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Genre extends Component {
    constructor(){
      super();
      this.state = {
        genre: []
      }
    }
    getGenre = () => {
    spotifyApi.getAvailableGenreSeeds().then(response => {
      console.log(response);
      // this.setState({
      //   genre: response
      // })
      });
    };
    componentDidMount() {
      this.getGenre();
    }

    render() {
      // console.log(this.state)
    const displayGenre = this.state.genre.map((genre, i) => {
      return (
        <div key={i}>
          <img src={genre.images[1].url} alt={genre.name} />

          <p>{genre.name}</p>
        </div>
      );
    });
      return (
        <div>text</div>
      )
    }
  }

export default Genre;
