import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
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
      this.setState({
        playListData: response.items
      });
    });
  }

  render() {
    return (
      <div>
        <div className="category-wrapper">
          {this.state.playListData &&
            this.state.playListData.map((track, i) => {
              if (track.track.preview_url) {
                return (
                  <div
                    className="home-image-container"
                    key={i}
                    onClick={() => this.playAudio(track.track.preview_url)}
                  >
                    <img
                      src={track.track.album.images[0].url}
                      alt=""
                      style={{ width: "100%" }}
                    />
                    <div className="track-play">
                      <div className="track-play-inner">
                        {this.state.playingUrl === track.track.preview_url ? (
                          <span>| |</span>
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
export default Playlist;
