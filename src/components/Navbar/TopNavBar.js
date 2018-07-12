import React, { Component } from 'react';
// import './TopNavBar.css';

class TopNavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="topNavContainer">
                    <a href="http://localhost:8888/login"><button className="loginButton">Login</button></a>
                    <button className="profileButton"></button>
                    <span className="username">Display Name</span>
            </div>
        );
    }
}

export default TopNavBar;