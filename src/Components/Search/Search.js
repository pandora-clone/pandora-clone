import React, { Component } from "react";
import { connect } from "react-redux";
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
      user_id: null
    };
  }

  handleInputChange = e => {
    console.log(e.target.value);
    this.setState({
      searchTerm: e.target.value
    });
  };

  getMe = () => {
    spotifyApi.getMe().then(response => {
      console.log(response.id);
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
        console.log(response);
        this.setState({
          searchAlbums: response.albums.items,
          searchArtists: response.artists.items,
          searchPlaylist: response.playlists.items,
          searchTracks: response.tracks.items
        });
      });
  };

  componentDidMount() {
    this.getMe();
  }

  render() {
    console.log("check here", this.props);
    console.log("search state", this.state);
    const searchAlbumsToDisplay = this.state.searchAlbums
      .filter(album => album.images[0])
      .map(album => {
        return (
          <div key={album.id}>
            <img src={album.images[0].url} alt={album.name} />
            <p>{album.name}</p>
          </div>
        );
      });
    const searchArtistsToDisplay = this.state.searchArtists
      .filter(artist => {
        return artist.images[0];
      })
      .map(artist => {
        console.log(typeof artist.images[0].url);
        return (
          <div key={artist.id}>
            <img src={artist.images[0].url} alt={artist.name} />

            <p>{artist.name}</p>
            <img src={artist.images[0].url} />
          </div>
        );
      });
    const searchPlaylistToDisplay = this.state.searchPlaylist
      .filter(playlist => playlist.images[0])
      .map(playlist => {
        return (
          <div key={playlist.id}>
            <img src={playlist.images[0].url} alt={playlist.name} />

            <p>{playlist.name}</p>
          </div>
        );
      });
    const searchTracksToDisplay = this.state.searchTracks
      .filter(track => track.album.images[0])
      .map(track => {
        return (
          <div key={track.id}>
            <img src={track.album.images[0].url} alt={track.name} />

            <p>{track.name}</p>
            <audio controls>
              <source src={track.preview_url} type="audio/mpeg" />
            </audio>

            <button
              onClick={() =>
                this.props.addFavList(
                  this.state.user_id,
                  track.name,
                  track.artists[0].name,
                  track.album.images[0].url,
                  track.preview_url
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
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button onClick={this.search}>Search</button>
        <div className="searched-tracks">{searchTracksToDisplay}</div>
        <div className="searched-albums">{searchAlbumsToDisplay}</div>
        <div className="searched-artists">{searchArtistsToDisplay}</div>
        <div className="searched-playlists">{searchPlaylistToDisplay}</div>
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
