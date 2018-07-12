import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SideNavBar.css';

class SideNavBar extends Component {
    render() {
        return (
            <div className="sideNavContainer">
                <button className="logo"></button>
                <h6>Sort By:</h6>
                <div className="navItemsContainer">
                    <button className="sideNavItems">Playlists</button>
                    <button className="sideNavItems">Artist</button>
                    <button className="sideNavItems">Album</button>
                    <button className="sideNavItems">Songs</button>
                    <button className="sideNavItems">Genre</button>
                </div>
            </div>
        );
    }
}

export default SideNavBar;