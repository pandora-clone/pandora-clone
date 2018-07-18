import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import spotifyWebApi from "spotify-web-api-js";

const spotifyApi = new spotifyWebApi();
class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: {}
    };
    this.getCategories = this.getCategories.bind(this);
    this.getHashParams = this.getHashParams.bind(this);
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getCategories() {
    spotifyApi.getCategories({ limit: 40 }).then(response => {
      // console.log("Categories", response.categories.items);
      this.setState({ categories: response.categories.items });
    });
  }

  componentDidMount() {
    this.getCategories();
  }
  componentDidUpdate() {
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.getMe().then(res => {
        console.log(res);
        const { display_name, id, email } = res;
        axios.post("/api/login", { display_name, id, email });
      });
    }
  }
  render() {
    return (
      <div>
        {/* {this.state.loggedIn && (
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        )} */}

        <div className="category-wrapper">
          {this.state.categories[0] &&
            this.state.categories.map((category, i) => {
              return (
                <div className="home-image-container" key={i}>
                  <Link to={"/genre/" + category.id}>
                    <img
                      src={category.icons[0].url}
                      style={{ width: "100%" }}
                      alt=""
                    />
                  </Link>
                  <div className="category-text">
                    <h2>{category.name}</h2>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Home;
