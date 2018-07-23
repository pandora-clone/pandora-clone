import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideNavBar extends Component {
  render() {
    return (
      <div className="sideBarContainer">
        <div className="sideNavContainer">
          <div className="logoContainer">
            <Link to="/" className="logo">swafli</Link>
          </div>
          <Link to="/search"><img className="search" src="http://www.clker.com/cliparts/n/U/H/1/H/u/search-icon-white-one-md.png" alt=""/>
          </Link>
          <div className="navItemsContainer">
            {/* <button className="sideNavItems">Playlists</button> */}
            <Link to="/artists" className="sideNavItems">Artists</Link>
            <Link to="/albums" className="sideNavItems">Albums</Link>
            <Link to="/songs" className="sideNavItems">Songs</Link>
            <Link to="/genre/:categoryName" className="sideNavItems">Genre</Link>
            <Link to="/usersongs" className="sideNavItems">New Uploads</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SideNavBar;
