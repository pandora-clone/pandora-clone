import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { connect } from "react-redux";
import { addRctPlayed } from "../../../redux/rctPlayedReducer";
const spotifyApi = new SpotifyWebApi();

class AlbumSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumSongs: [],
      playingUrl: "",
      audio: null,
      playing: false,
      albumImgUrl: ""
    };
  }

  playAudio(previewUrl, trackId) {
    let audio = new Audio(previewUrl);
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio
      });
      this.props.addRctPlayed(trackId);
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

  componentDidMount() {
    this.getAlbumTracks();
    this.getAlbum();
  }

  getAlbumTracks = () => {
    spotifyApi.getAlbumTracks(this.props.match.params.id).then(response => {
      // console.log("response: ", response);
      this.setState({
        albumSongs: response.items
      });
    });
  };

  getAlbum = () => {
    spotifyApi.getAlbum(this.props.match.params.id).then(response => {
      // console.log("album response: ", response);
      this.setState({
        albumImgUrl: response.images[0].url
      });
    });
  };

  render() {
    // console.log("albumsearch page:   ", this.props);
    // console.log(this.state);
    return (
      <div className="albumSearchWrapper">
        <div className="albumSearchImage">
          <img src={this.state.albumImgUrl} alt="album Img" />
        </div>
        <div className="allSongContainer">
          {this.state.albumSongs &&
            this.state.albumSongs.map((track, i) => {
              if (track.preview_url) {
                return (
                  <div
                  className="eachSongContainer"
                  key={i}
                  onClick={() => this.playAudio(track.preview_url, track.id)}
                  >
                      <div>
                        {this.state.playingUrl === track.preview_url ? (
                          <span>||</span>
                        ) : (
                          <span>&#9654;</span>
                        )}
                      </div>
                    <div className="category-text">
                      <h2>{track.name}</h2>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { addRctPlayed }
)(AlbumSearch);
