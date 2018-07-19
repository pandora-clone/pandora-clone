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
  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio
      });
    } else {
      if (this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({
          playing: false
        });
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playingUrl: previewUrl,
          audio
        });
      }
    }
  }

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
        <div key={i} onClick={() => this.playAudio(song.preview_url)}>
          <div className="track-play">
            <div className="track-play-inner">
              {this.state.playingUrl === song.preview_url ? (
                <span>| |</span>
              ) : (
                <span>&#9654;</span>
              )}
            </div>
          </div>
          <img
            className="songs-img-container"
            src={song.album.images[0].url}
            alt={song.name}
            // style={{ width: "100%" }}
          />
          <p>{song.name}</p>
        </div>
      );
    });

    const favListToDisplay = this.props.favReducer.favList.map((favSong, i) => {
      return (
        <div key={i} onClick={() => this.playAudio(favSong.preview_url)}>
          <div className="track-play">
            <div className="track-play-inner">
              {this.state.playingUrl === favSong.preview_url ? (
                <span>| |</span>
              ) : (
                <span>&#9654;</span>
              )}
            </div>
          </div>
          <img
            className="songs-img-container"
            src={favSong.img}
            alt={favSong.song_name}
            // style={{ width: "100%" }}
          />
          <p>{favSong.song_name}</p>
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
        <div className="sub-songs-container">{favListToDisplay}</div>
        <h2>Recently played</h2>
        <div className="sub-songs-container"> {rctListToDisplay}</div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getFavList, deleteFavList, getRctPlayed }
)(Songs);
