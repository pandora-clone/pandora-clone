import React, { Component } from 'react';
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class TopNavBar extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
          spotifyApi.setAccessToken(token);
        }
        this.state = {
          loggedIn: token ? true : false,
          showMenu: false
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(e) {
        e.preventDefault();
        this.setState({ showMenu: true }, () => {document.addEventListener('click', this.closeMenu)});
    }
      
    closeMenu() {
        this.setState({ showMenu: false }, () => {document.removeEventListener('click', this.closeMenu)});
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
    render() {
        console.log(this.state.loggedIn);
        return (
            <div className="topNavContainer">
                    {this.state.loggedIn ? 
                    (<a href="http://localhost:8888/logout"><button className="loginLogout" onClick={ () => window.open("https://accounts.spotify.com/en/logout?", "_blank", "toolbar=yes,scrollbars=no,resizable=no,top=200,left=450,width=600,height=400")}>Logout</button></a>) :
                    (<a href="http://localhost:8888/login"><button className="loginLogout">Login</button></a>)}
                    <button className="profileButton"></button>
                    <span className="displayName">Display Name</span>
            </div>
        );
    }
}

export default TopNavBar;