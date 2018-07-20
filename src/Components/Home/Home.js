import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { auth, database } from "../../firebase/firebase";
// import pick from "lodash/pick";
import { getUser, login } from "../../redux/userReducer";

import spotifyWebApi from "spotify-web-api-js";

const spotifyApi = new spotifyWebApi();
class Home extends Component {
  constructor() {
    super();
    this.usersRef = null;
    this.userRef = null;
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      categories: {},
      name: "Not Checked",
      albumArt: "",
      songs: [],
      playlist: [],
      newReleases: [],
      user: null,
      users: {}
    };

    this.usersRef = database.ref("/users");
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

  // database
  //   .ref()
  //   .child(response.id)
  //   .push(response.id);

  // if (response) {
  //   this.setState({
  //     user: response
  //   });
  //   this.usersRef = database.ref("/users");
  //   this.userRef = this.usersRef.child(this.state.user.id);

  //   this.userRef.once("value").then(snapshot => {
  //     if (snapshot.val()) return;
  //     const userData = pick(response, ["id", "display_name", "email"]);
  //     this.userRef.set(pick(userData));
  //   });
  //   this.usersRef.on("value", snapshot => {
  //     this.setState({ users: snapshot.val() });
  //   });
  // }

  getNewReleases = () => {
    spotifyApi.getNewReleases().then(response => {
      // console.log(response);
      this.setState({
        newReleases: response.albums.items
      });
    });
  };

  getCategories() {
    spotifyApi.getCategories({ limit: 40 }).then(response => {
      // console.log("Categories", response.categories.items);
      this.setState({ categories: response.categories.items });
    });
  }

  componentDidMount() {
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi
        .getMe()
        .then(res => {
          console.log(res);
          const { display_name, id, email, images } = res;
          this.props.login(display_name, id, email, images);
        })
        .then(() => this.props.getUser());
    }
    this.getCategories();

    database.ref().on("value", snapshot => {
      console.log("Data Has Changed", snapshot.val());
    });
  }
  componentDidUpdate() {}
  render() {
    console.log(this.props);
    return (
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
    );
  }
}

const mapStateToProps = state => state.userReducer;

export default connect(
  mapStateToProps,
  { getUser, login }
)(Home);
