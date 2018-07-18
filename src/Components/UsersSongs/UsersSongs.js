import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { auth, database } from "../../firebase/firebase";
import { Link } from "react-router-dom";
const spotifyApi = new SpotifyWebApi();

class UsersSongs extends Component {
  constructor(props) {
    super(props);
    this.userRef = null;

    this.state = {
      songName: "",
      songGenre: "",
      songUrl: "",
      imageUrl: "",
      user: null
    };

    this.userRef = database.ref("/users");
    this.songsRef = database.ref("/songs");
  }

  componentDidMount() {
    this.getMe();
  }

  getMe = () => {
    spotifyApi.getMe().then(response => {
      this.setState({
        user: response
      });
      console.log(response);
      this.userRef.child(response.id).set(response);
    });
  };

  render() {
    return (
      <div style={{ margin: "150px" }}>
        <div>User Songs Rendered</div>

        <Link to="/addsong">
          <button>Go to Add Song</button>
        </Link>
      </div>
    );
  }
}
export default UsersSongs;
