import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { connect } from "react-redux";
import { addRctPlayed } from "../../redux/rctPlayedReducer";
const spotifyApi = new SpotifyWebApi();

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistId: null,
      playListData: null,
      playingUrl: "",
      audio: null,
      playing: false
    };
    this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
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
    const { playListId } = this.props.match.params;
    this.setState(
      {
        playlistId: playListId
      },
      () => this.getPlaylistTracks()
    );
  }

  getPlaylistTracks() {
    spotifyApi.getPlaylistTracks("", this.state.playlistId).then(response => {
      console.log("response: ", response);

      this.setState({
        playListData: response.items
      });
    });
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div>
        <h1 className="page-title"> Playlist Tracks</h1>
        <div className="category-wrapper">
          {this.state.playListData &&
            this.state.playListData.map((track, i) => {
              if (track.track.preview_url) {
                return (
                  <div
                    className="home-image-container"
                    key={i}
                    onClick={() =>
                      this.playAudio(track.track.preview_url, track.track.id)
                    }
                  >
                    <img
                      src={track.track.album.images[0].url}
                      alt=""
                      style={{ width: "100%" }}
                    />
                    <div className="track-play">
                      <div className="track-play-inner">
                        {this.state.playingUrl === track.track.preview_url ? (
                          <span>||</span>
                        ) : (
                          <span>&#9654;</span>
                        )}
                      </div>
                    </div>
                    <div className="category-text">
                      <h2>{track.track.name}</h2>
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
)(Playlist);
