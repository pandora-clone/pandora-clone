import React, { Component } from 'react';
import './TopNavBar.css';

class TopNavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchParams: ''

        }
    }
searchParamsHandler = e => {
    if(e.key === "Enter"){
        // alert("You pressed a key inside the input field");
    }
}
setStateHandler = e => {
    this.setState({searchParams: e.target.value})
};
    render() {
        const {searchParams} = this.state;

        return (
            <div className="topNavContainer">
                        <input
                            onKeyPress={(e) => this.searchParamsHandler(e)}
                            placeholder="Search here..."
                            value={searchParams}
                            onChange={(e) => this.setStateHandler(e)}
                            type="text"
                            name="searchParams"
                        />
                    <button className="loginButton">Login</button>
                    <button className="profileButton"></button>
                    <span className="username">Display Name</span>
            </div>
        );
    }
}

export default TopNavBar;