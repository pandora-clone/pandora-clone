import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideNavBar extends Component {
  render() {
    return (
      <div className="sideBarContainer">
        <div className="logoContainer">
          <Link to="/">
            <button className="logo" />
          </Link>
        </div>
        <div className="sideNavContainer">
          <Link to="/search" className="search">
            Search
          </Link>
          <span className="sort">Sort By:</span>
          <div className="navItemsContainer">
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
            <Link to="/genre/:categoryName" className="sideNavItems">
              Genre
            </Link>
            <Link to="/usersongs" className="sideNavItems">
              New Uploads
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SideNavBar;
