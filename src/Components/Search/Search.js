import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { addFavList, getFavList } from "../../redux/favReducer";
import { addRctPlayed } from "../../redux/rctPlayedReducer";
import {
  getAlbums,
  getTracks,
  getPlaylists,
  getArtists
} from "../../redux/searchReducer";

const spotifyApi = new SpotifyWebApi();
class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      user_id: null
      // liked: false
    };
  }

  handleFav = (
    user_id,
    track_name,
    artists_name,
    img_url,
    preview_url,
    album_id,
    artists_id,
    track_id
  ) => {
    this.props
      .addFavList(
        user_id,
        track_name,
        artists_name,
        img_url,
        preview_url,
        album_id,
        artists_id,
        track_id
      )
      .then(() => this.props.getFavList(user_id));
  };

  handleSearch = e => {
    // console.log(e.target.value);
    // e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    });
    this.props.getAlbums(this.state.searchTerm);
    this.props.getArtists(this.state.searchTerm);
    this.props.getPlaylists(this.state.searchTerm);
    this.props.getTracks(this.state.searchTerm);
  };

  submitSearch = e => {
    console.log(e.key);
    if (e.key === "Enter") {
      this.props.getAlbums(this.state.searchTerm);
      this.props.getArtists(this.state.searchTerm);
      this.props.getPlaylists(this.state.searchTerm);
      this.props.getTracks(this.state.searchTerm);
    }
  };

  getMe = () => {
    spotifyApi.getMe().then(response => {
      // console.log(response.id);
      this.setState({
        user_id: response.id
      });
    });
  };

  componentDidMount() {
    this.getMe();
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
    console.log("check here", this.props);
    console.log("track id", this.props.favReducer.favList);
    // console.log("search state", this.state);
    const checkFavList = this.props.favReducer.favList.map((item, i) => {
      return item.track_id;
    });
    console.log(checkFavList);
    const searchAlbumsToDisplay = this.props.searchReducer.searchAlbums
      .filter(album => album.images[0])
      .map((album, i) => {
        return (
          <div key={i}>
            <Link to={`/album/${album.id}`}>
              <div className="search-img-box">
                <img src={album.images[0].url} alt={album.name} />
                <h3>{album.name}</h3>
              </div>
            </Link>
          </div>
        );
      });
    const searchArtistsToDisplay = this.props.searchReducer.searchArtists
      .filter(artist => {
        return artist.images[0];
      })
      .map(artist => {
        // console.log(typeof artist.images[0].url);
        return (
          <div key={artist.id}>
            <Link to={`/artist/${artist.id}`}>
              <div className="search-img-box">
                <img
                  className="search-artist-img"
                  src={artist.images[0].url}
                  alt={artist.name}
                />
                <h3>{artist.name}</h3>
              </div>
            </Link>
          </div>
        );
      });
    const searchPlaylistToDisplay = this.props.searchReducer.searchPlaylists
      .filter(playlist => playlist.images[0])
      .map(playlist => {
        return (
          <div key={playlist.id}>
            <Link to={`/playlist/${playlist.id}`}>
              <div className="search-img-box">
                <img src={playlist.images[0].url} alt={playlist.name} />
                <h3>{playlist.name}</h3>
              </div>
            </Link>
          </div>
        );
      });
    const searchTracksToDisplay = this.props.searchReducer.searchTracks
      .filter(track => track.album.images[0] && track.preview_url !== null)
      .map((track, i) => {
        return (
          <div key={i}>
            <div className="search-track-play">
              <div
                className="search-track-play-inner"
                onClick={() => this.playAudio(track.preview_url, track.id)}
              >
                {this.state.playingUrl === track.preview_url ? (
                  <span>||</span>
                ) : (
                  <span>&#9654;</span>
                )}
              </div>
              <img src={track.album.images[0].url} alt={track.name} />
              <h3>{track.name}</h3>
              <button
                className="add-fav-icon"
                onClick={() =>
                  this.handleFav(
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
                {checkFavList.includes(track.id) ? (
                  <FontAwesomeIcon icon={heartSolid} />
                ) : (
                  <FontAwesomeIcon icon={heartRegular} />
                )}
              </button>
            </div>
          </div>
        );
      });
    return (
      <div className="search-wrapper">
        <input
          className="searchInput"
          value={this.state.searchTerm}
          onChange={this.handleSearch}
          onKeyPress={e => this.submitSearch(e)}
        />

        {this.props.searchReducer.searchTracks[0] ? (
          <div>
            <h1>Tracks</h1>
            <div className="searched-tracks result-box">
              {searchTracksToDisplay}
            </div>
          </div>
        ) : null}
        {this.props.searchReducer.searchAlbums[0] ? (
          <div>
            <h1> Albums </h1>
            <div className="searched-albums result-box">
              {searchAlbumsToDisplay}
            </div>
          </div>
        ) : null}
        {this.props.searchReducer.searchArtists[0] ? (
          <div>
            <h1>Artists</h1>
            <div className="searched-artists result-box">
              {searchArtistsToDisplay}
            </div>
          </div>
        ) : null}

        {this.props.searchReducer.searchPlaylists[0] ? (
          <div>
            <h1>Playlists</h1>
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
    getFavList,
    addFavList,
    addRctPlayed,
    getAlbums,
    getTracks,
    getPlaylists,
    getArtists
  }
)(Search);
