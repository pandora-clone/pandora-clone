import React, { Component } from "react";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Genre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      playList: null
    };
    this.getCategory = this.getCategory.bind(this);
  }

  componentDidMount() {
    const { categoryName } = this.props.match.params;
    this.setState(
      {
        category: categoryName
      },
      () => this.getCategory()
    );
  }

  getCategory() {
    spotifyApi.getCategoryPlaylists(this.state.category).then(response => {
      this.setState({
        playList: response.playlists.items
      });
    });
  }
  render() {
    return (
      <div>
        <div className="category-wrapper">
          {this.state.playList &&
            this.state.playList.map((playlist, i) => {
              return (
                <div className="home-image-container" key={i}>
                  <Link to={"/playlist/" + playlist.id}>
                    <img
                      src={playlist.images[0].url}
                      style={{ width: "100%" }}
                      alt=""
                    />
                  </Link>
                  <div className="category-text">
                    <h2>{playlist.name}</h2>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Genre;
