import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";

import { addFavList } from "../../redux/favReducer";
import { addRctPlayed } from "../../redux/rctPlayedReducer";

const spotifyApi = new SpotifyWebApi();
class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      searchAlbums: [],
      searchArtists: [],
      searchPlaylist: [],
      searchTracks: [],
      user_id: null,
      refs: ""
    };
  }

  handleInputChange = e => {
    // console.log(e.target.value);
    this.setState({
      searchTerm: e.target.value
    });
  };

  getMe = () => {
    spotifyApi.getMe().then(response => {
      // console.log(response.id);
      this.setState({
        user_id: response.id
      });
    });
  };
  search = () => {
    spotifyApi
      .search(this.state.searchTerm, ["album", "artist", "playlist", "track"], {
        limit: 10
      })
      .then(response => {
        // console.log(response);
        this.setState({
          searchAlbums: response.albums.items,
          searchArtists: response.artists.items,
          searchPlaylist: response.playlists.items,
          searchTracks: response.tracks.items,
          playingUrl: "",
          audio: null,
          playing: false
        });
      });
  };

  componentDidMount() {
    this.getMe();
    // this.search();
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
        this.setState({
          playingUrl: previewUrl,
          audio
        });
      }
    }
  }

  render() {
    // console.log("check here", this.props);
    console.log("search state", this.state);
    const searchAlbumsToDisplay = this.state.searchAlbums
      .filter(album => album.images[0])
      .map(album => {
        return (
          <div key={album.id}>
            <img src={album.images[0].url} alt={album.name} />
            <h3>{album.name}</h3>
          </div>
        );
      });
    const searchArtistsToDisplay = this.state.searchArtists
      .filter(artist => {
        return artist.images[0];
      })
      .map(artist => {
        // console.log(typeof artist.images[0].url);
        return (
          <div key={artist.id}>
            <img src={artist.images[0].url} alt={artist.name} />
            <h3>{artist.name}</h3>
          </div>
        );
      });
    const searchPlaylistToDisplay = this.state.searchPlaylist
      .filter(playlist => playlist.images[0])
      .map(playlist => {
        return (
          <div key={playlist.id}>
            <Link to={"/playlist/" + playlist.id}>
              <img src={playlist.images[0].url} alt={playlist.name} />
              <h3>{playlist.name}</h3>
            </Link>
          </div>
        );
      });
    const searchTracksToDisplay = this.state.searchTracks
      .filter(track => track.album.images[0] && track.preview_url !== null)
      .map((track, i) => {
        return (
          <div
            key={i}
          >
            <img src={track.album.images[0].url} alt={track.name}
            onClick={() => this.playAudio(track.preview_url, track.id)}/>
            {/* <div className="track-play"> */}
            <div className="track-play-inner">
              {this.state.playingUrl === track.preview_url ? (
                <span>| |</span>
              ) : (
                <span>&#9654;</span>
              )}
            </div>
            {/* </div> */}
            <h3>{track.name}</h3>

            <button
              onClick={() =>
                this.props.addFavList(
                  this.state.user_id,
                  track.name,
                  track.artists[0].name,
                  track.album.images[0].url,
                  track.preview_url,
                  track.album.id,
                  track.album.artists[0].id,
                  track.id
                )
              }
            >
              add to Fav
            </button>
          </div>
        );
      });
    return (
      <div className="search-wrapper">
        <input
          className="searchInput"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button className="searchButton" onClick={this.search}>
          Search
        </button>
        {this.state.searchTracks[0] ? (
          <div>
            <h1> TRACKS </h1>
            <div className="searched-tracks result-box">
              {searchTracksToDisplay}
            </div>
          </div>
        ) : null}
        {this.state.searchAlbums[0] ? (
          <div>
            <h1> ALBUMS </h1>
            <div className="searched-albums result-box">
              {searchAlbumsToDisplay}
            </div>
          </div>
        ) : null}
        {this.state.searchArtists[0] ? (
          <div>
            <h1> ARTISTS</h1>
            <div className="searched-artists result-box">
              {searchArtistsToDisplay}
            </div>
          </div>
        ) : null}

        {this.state.searchPlaylist[0] ? (
          <div>
            <h1>PLAYLISTS</h1>
            <div className="searched-playlists result-box">
              {searchPlaylistToDisplay}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    addFavList,
    addRctPlayed
  }
)(Search);
