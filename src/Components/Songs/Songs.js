import React, { Component } from "react";
import { connect } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";

import { getFavList, deleteFavList } from "../../redux/favReducer";
import { getRctPlayed } from "../../redux/rctPlayedReducer";
const spotifyApi = new SpotifyWebApi();

class Songs extends Component {
  constructor() {
    super();
    this.state = {
      user_id: 0,
      rctList: []
    };
  }

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

  getRctList = () => {
    console.log(this.props.rctPlayedReducer.rctPlayedList.rctPlayedList);
    spotifyApi
      .getTracks(this.props.rctPlayedReducer.rctPlayedList.rctPlayedList, {
        limit: 15
      })
      .then(response => {
        console.log(response);
        this.setState({
          rctList: response.tracks
        });
      });
  };

  componentDidMount() {
    this.getMe();
    let { rctPlayedList } = this.props.rctPlayedReducer.rctPlayedList;
    rctPlayedList && this.getRctList();
  }
  render() {
    console.log("song page props: ", this.props.rctPlayedReducer.rctPlayedList);
    console.log(this.state);
    console.log("songs page:", this.props);
    const rctListToDisplay = this.state.rctList.map((song, i) => {
      return (
        <div key={i}>
          <p>{song.name}</p>
          <img
            className="songs-img-container"
            src={song.album.images[0].url}
            alt={song.name}
            // style={{ width: "100%" }}
          />
          <audio controls className="songs-player-bar">
            <source src={song.preview_url} type="audio/mpeg" />
          </audio>
        </div>
      );
    });

    const favListToDisplay = this.props.favReducer.favList.map(favSong => {
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
        {rctListToDisplay}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getFavList, deleteFavList, getRctPlayed }
)(Songs);
