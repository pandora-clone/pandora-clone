import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SideNavBar extends Component {
  render() {
    return (
      <div className="sideBarContainer">
        <div className="sideNavContainer">
          <div className="logoContainer">
            <Link to="/" className="logo">swafli</Link>
          </div>
          <Link to="/search">
          <FontAwesomeIcon 
            className="search-icon"
            icon={faSearch}
            />
          </Link>
          <div className="navItemsContainer">
            {/* <button className="sideNavItems">Playlists</button> */}
            <Link to="/artists" className="sideNavItems">Artists</Link>
            <Link to="/albums" className="sideNavItems">Albums</Link>
            <Link to="/songs" className="sideNavItems">Songs</Link>
            <Link to="/usersongs" className="sideNavItems">New Uploads</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SideNavBar;
