import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { database } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import map from "lodash/map";
import size from "lodash/size";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faPlus } from "@fortawesome/free-solid-svg-icons";
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
      user: {},

      songs: null,
      playingUrl: "",
      audio: null,
      playing: false
    };

    this.userRef = database.ref("/users");
    this.songsRef = database.ref("/songs");
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDeselect = this.handleDeselect.bind(this);
  }

  async componentDidMount() {
    await this.getMe();
    this.songsRef.on("value", snapshot => {
      console.log(snapshot.val());
      this.setState({
        songs: snapshot.val()
      });
    });
  }

  handleSelect(key) {
    const currentUser = database
      .ref("/songs")
      .child(key)
      .child("votes")
      .child(this.state.user.id)
      .set(true);
  }

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
        this.setState({ playing: true, playingUrl: previewUrl, audio });
      }
    }
  }

  handleDeselect(key) {
    const currentUser = database
      .ref("/songs")
      .child(key)
      .child("votes")
      .child(this.state.user.id)
      .remove();
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
    console.log(this.state.user.id);
    const { songs } = this.state;
    // const userHasSelected = votes && Object.keys(votes).includes(this.state.user.id);
    return (
      <div>
        <h1 className="page-title"> Uploaded By Users </h1>
        <div className="category-wrapper">
          {map(songs, (song, key) => (
            <div className="song-container" key={key}>
              {song.votes &&
              Object.keys(song.votes).includes(this.state.user.id) ? (
                <div
                  onClick={() => this.handleDeselect(key)}
                  className="like-counter-box"
                >
                  <span className="like-counter-number">
                    {size(song.votes)}
                  </span>
                  <FontAwesomeIcon className="heart-active" icon={faThumbsUp} />
                </div>
              ) : (
                <div
                  onClick={() => this.handleSelect(key)}
                  className="like-counter-box"
                >
                  <span className="like-counter-number">
                    {size(song.votes)}
                  </span>
                  <FontAwesomeIcon
                    className="heart-disabled"
                    icon={faThumbsUp}
                  />
                </div>
              )}

              <div
                className="newUploads-image-container"
                onClick={() => this.playAudio(song.songUrl)}
              >
                <img
                  src={song.imageUrl}
                  alt=""
                  style={{ width: "200px", height: "200px" }}
                />
                <div className="track-play">
                  <div className="track-play-user-uploads">
                    {this.state.playingUrl === song.songUrl ? (
                      <span>| |</span>
                    ) : (
                      <span>&#9654;</span>
                    )}
                  </div>
                </div>
                <div className="song-name-text">
                  <h2>{song.songName}</h2>
                </div>
              </div>
              <div className="song-description ">
                <div className="song-author">
                  <h2>{song.author}</h2>
                </div>
              </div>
            </div>
          ))}
          <Link to="/addsong">
            <div className="add-song-link">
              <FontAwesomeIcon className="add-plus-sign" icon={faPlus} />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
export default UsersSongs;
