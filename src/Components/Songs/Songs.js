import React, { Component } from "react";
import { connect } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";

import { getFavList, deleteFavList } from "../../redux/favReducer";
const spotifyApi = new SpotifyWebApi();

class Songs extends Component {
  constructor() {
    super();
    this.state = {
      user_id: 0
    };
  }

  getMe = () => {
    spotifyApi
      .getMe()
      .then(response => {
        console.log(response.id);
        this.setState({
          user_id: response.id
        });
      })
      .then(() => {
        this.props.getFavList(this.state.user_id);
      });
  };

  componentDidMount() {
    this.getMe();
  }
  render() {
    console.log(this.props);
    // this is from our database
    const favListToDisplay = this.props.favList.map(favSong => {
      return (
        <div key={favSong.id}>
          <p>{favSong.song_name}</p>
          <img
            className="songs-img-container"
            src={favSong.img}
            alt={favSong.song_name}
            // style={{ width: "100%" }}
          />
          <audio controls className="songs-player-bar">
            <source src={favSong.preview_url} type="audio/mpeg" />
          </audio>
          <button
            onClick={() =>
              this.props
                .deleteFavList(favSong.id)
                .then(() => this.props.getFavList(this.state.user_id))
            }
          >
            Delete
          </button>
        </div>
      );
    });

    return (
      <div className="songs-container">
        <h2>Your favorite List</h2>
        <div className="fav-songs-container">{favListToDisplay}</div>
        <h2>Recently played</h2>
      </div>
    );
  }
}

const mapStateToProps = state => state.favList;

export default connect(
  mapStateToProps,
  { getFavList, deleteFavList }
)(Songs);
