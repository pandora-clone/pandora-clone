import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../redux/userReducer";
import { getFavList } from "../../redux/favReducer";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Albums extends Component {
  constructor() {
    super();
    this.state = {
      albums: []
    };
  }
  componentDidMount() {
    this.props
      .getFavList(this.props.userReducer.user.user_id)
      .then(() => this.getAlbums());
  }
  getAlbums = () => {
    const albumIds =
      this.props.favReducer.favList &&
      this.props.favReducer.favList.map((song, i) => {
        if (song.album_id !== null) {
          return song.album_id;
        } else {
          return null;
        }
      });
    console.log("albumIds: ", albumIds);

    spotifyApi.getAlbums(albumIds).then(response => {
      console.log(response);
      this.setState({
        albums: response.albums
      });
    });
  };

  render() {
    console.log(this.props);
    const albumsToDisplay = this.state.albums.map((album, i) => {
      return (
        <div key={i}>
          <div className="albumImage">
            <Link to={`/album/${album.id}`}>
              <img
                src={album.images[1].url}
                style={{ width: "100%" }}
                alt={album.name}
              />
            </Link>
          </div>
          <div className="albumName">
            <span>{album.name}</span>
          </div>
        </div>
      );
    });
    return <div className="albumWrapper">{albumsToDisplay}</div>;
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser, getFavList }
)(Albums);
