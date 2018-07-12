import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './SideNavBar.css';

class SideNavBar extends Component {
    render() {
        return (
            <div className="sideNavContainer">
                <Link to="/" className="logo">Home</Link>
                <Link to="/search" className="search">Search</Link>
                <h6>Sort By:</h6>
                <div className="navItemsContainer">
                    
                    {/* <button className="sideNavItems">Playlists</button> */}
                    <Link to="/artists" className="sideNavItems">Artists</Link>
                    <Link to="/albums" className="sideNavItems">Albums</Link>
                    <Link to="/songs" className="sideNavItems">Songs</Link>
                    <Link to="/genre" className="sideNavItems">Genre</Link>
                </div>
            </div>
        );
    }
}

export default SideNavBar;