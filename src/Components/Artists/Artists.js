import React, { Component } from "react";
import { connect } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import { getFavList } from "../../redux/favReducer";
const spotifyApi = new SpotifyWebApi();

class Artist extends Component {
  constructor() {
    super();
    this.state = {
      user_id: ""
    };
  }
  getArtists = () => {
    spotifyApi.getArtists(["6rqhFgbbKwnb9MLmUQDhG6"]).then(response => {
      console.log(response);
    });
  };
  getMe = () => {
    spotifyApi
      .getMe()
      .then(response => {
        // console.log(response.id);
        this.setState({
          user_id: response.id
        });
      })
      .then(() => {
        this.props.getFavList(this.state.user_id);
      });
  };

  componentDidMount() {
    this.getArtists();
    this.getMe();
  }

  render() {
    console.log("artist page:", this.props);
    return <div>Artist List</div>;
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { getFavList }
)(Artist);
