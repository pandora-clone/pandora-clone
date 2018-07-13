import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './SideNavBar.css';

class SideNavBar extends Component {
    render() {
        return (
            <div className="sideBarContainer">
                <div className="logoContainer">
                    <Link to="/" ><button className="logo"></button></Link>
                </div>
                <div className="sideNavContainer">
                    <Link to="/search" className="search">Search</Link>
                    <span className="sort">Sort By:</span>
                    <div className="navItemsContainer">
                        {/* <button className="sideNavItems">Playlists</button> */}
                        <Link to="/artists" className="sideNavItems">Artists</Link>
                        <Link to="/albums" className="sideNavItems">Albums</Link>
                        <Link to="/songs" className="sideNavItems">Songs</Link>
                        <Link to="/genre" className="sideNavItems">Genre</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideNavBar;