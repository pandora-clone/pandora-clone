import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './SideNavBar.css';

class SideNavBar extends Component {
    render() {
        return (
            <div className="sideNavContainer">
                <Link to="/" className="logo"></Link>
                <h6>Sort By:</h6>
                <div className="navItemsContainer">
                    <Link to="/search"><button className="sideNavItems"></button></Link>
                    <button className="sideNavItems">Playlists</button>
                    <Link to="/artists" className="sideNavItems">Artists</Link>
                    <Link to="/albums" className="sideNavItems">Albums</Link>
                    <button className="sideNavItems">Songs</button>
                    <Link to="/genre" className="sideNavItems">Genre</Link>
                </div>
            </div>
        );
    }
}

export default SideNavBar;