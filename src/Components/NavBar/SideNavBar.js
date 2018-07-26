import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";

import { getUser } from "../../redux/userReducer";

const spotifyApi = new SpotifyWebApi();
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import homeIcon from "../../access/home-icon.svg";

class SideNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      profilePic: "",
      id: ""
    };
    this.getMe = this.getMe.bind(this);
  }
  getMe() {
    spotifyApi.getMe().then(response => {
      console.log(response);
      response.images[0] === undefined
        ? this.setState({
            name: response.display_name,
            id: response.id,
            profilePic:
              "https://gaia.ub.edu/twiki/pub/Main/UserProfileHeader/default-user-profile.jpg"
          })
        : this.setState({
            name: response.display_name,
            id: response.id,
            profilePic: response.images[0].url
          });
    });
  }

  componentDidMount() {
    this.getMe();
  }
  render() {
    return (
      <div className="sideBarContainer">
        <div className="sideNavContainer">
          <div className="logoContainer">
            <Link to="/">
              <p>swafli</p>
            </Link>
          </div>

          <div className="navItemsContainer">
            <Link to="/" className="sideNavItems">
              Home
              {/* <img src={homeIcon} alt="home" /> */}
            </Link>
            <Link to="/search" className="sideNavItems">
              Search
              {/* <FontAwesomeIcon className="search-icon" icon={faSearch} /> */}
            </Link>
            {/* <button className="sideNavItems">Playlists</button> */}
            <Link to="/artists" className="sideNavItems">
              Artists
            </Link>
            <Link to="/albums" className="sideNavItems">
              Albums
            </Link>
            <Link to="/songs" className="sideNavItems">
              Songs
            </Link>
            <Link to="/usersongs" className="sideNavItems">
              New Uploads
            </Link>
          </div>
        </div>
        <div className="topNavContainer">
          {this.props.user.user_id ? (
            <img className="profileButton" src={this.state.profilePic} />
          ) : null}
          <div className="display-name">
            {this.state.name != null ? (
              <span>{this.state.name}</span>
            ) : (
              <span>{this.state.id}</span>
            )}
          </div>
          {this.props.user.user_id ? (
            <a
              // href="http://localhost:8888/logout"
              href="/logout"
              className="sideNavItems"
              onClick={() =>
                window.open(
                  "https://accounts.spotify.com/en/logout?",
                  "_blank",
                  "toolbar=yes,scrollbars=no,resizable=no,top=200,left=450,width=600,height=400"
                )
              }
            >
              Log Out
            </a>
          ) : (
            <a 
            // href="http://localhost:8888/login"
            href="/login" 
            className="sideNavItems">
              Log In
            </a>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.userReducer;

export default connect(
  mapStateToProps,
  { getUser }
)(SideNavBar);
