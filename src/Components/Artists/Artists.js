import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import { getFavList } from "../../redux/favReducer";
import { getUser } from "../../redux/userReducer";

const spotifyApi = new SpotifyWebApi();

class Artist extends Component {
  constructor() {
    super();
    this.state = {
      artists: []
    };
  }
  getArtists = () => {
    const artistIds =
      this.props.favReducer.favList &&
      this.props.favReducer.favList.map(song => {
        if (song.artist_id !== null) {
          return song.artist_id;
        } else {
          return null;
        }
      });
    console.log("look here....... ", artistIds);
    spotifyApi.getArtists(artistIds, { limit: 20 }).then(response => {
      console.log(response);
      this.setState({ artists: response.artists });
    });
  };

  componentDidMount() {
    this.props
      .getFavList(this.props.userReducer.user.user_id)
      .then(() => this.getArtists());
  }

  render() {
    console.log("artist page:", this.props);
    console.log(this.state);

    const artistToDisplay = this.state.artists.map((artist, i) => {
      return (
        <div key={i}>
          <Link to={`/artist/${artist.id}`}>
            <h1 className="artistName">{artist.name}</h1>
            <img
              className="artistImage"
              src={artist.images[0].url}
              alt={artist.name}
            />
          </Link>
          <p className="artistFollowers">followers: {artist.followers.total}</p>
        </div>
      );
    });
    return <div className="artistWrapper">{artistToDisplay}</div>;
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { getFavList, getUser }
)(Artist);
