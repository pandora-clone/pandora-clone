import React, { Fragment, Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { connect } from "react-redux";
import { addRctPlayed } from "../../../redux/rctPlayedReducer";
const spotifyApi = new SpotifyWebApi();

class ArtistTracks extends Component {
  constructor() {
    super();
    this.state = {
      artistTopTracks: [],
      artist: "",
      playingUrl: ""
    };
  }

  getArtistTopTracks = () => {
    spotifyApi
      .getArtistTopTracks(this.props.match.params.id, "US")
      .then(response => {
        console.log(" artist tracks response: ", response.tracks);
        this.setState({
          artistTopTracks: response.tracks,
          artist: response.tracks[0].artists[0].name
        });
      });
  };

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
    this.getArtistTopTracks();
  }

  render() {
    // console.log(this.state);
    return (
      <Fragment>
        <h1 className="page-title">Top Tracks by {this.state.artist}</h1>
        <div className="category-wrapper">
          {this.state.artistTopTracks &&
            this.state.artistTopTracks.map((track, i) => {
              // console.log("track", track);
              if (track.preview_url) {
                return (
                  <div key={i} className="home-image-container">
                    <img
                      src={track.album.images[0].url}
                      style={{ width: "100%" }}
                      alt={track.name}
                    />
                    <div
                      className="track-play-inner"
                      onClick={() =>
                        this.playAudio(track.preview_url, track.id)
                      }
                    >
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
      </Fragment>
    );
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { addRctPlayed }
)(ArtistTracks);
