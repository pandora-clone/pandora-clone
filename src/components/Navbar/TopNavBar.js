import React, { Component } from "react";
import { connect } from "react-redux";

import { getUser } from "../../redux/userReducer";

class TopNavBar extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="topNavContainer">
        {/* <button onClick={this.props.getUser}>Check users</button> */}
        {this.props.user.user_id ? (
          <a href="http://localhost:8888/logout">
            <button
              className="loginLogout"
              onClick={() =>
                window.open(
                  "https://accounts.spotify.com/en/logout?",
                  "_blank",
                  "toolbar=yes,scrollbars=no,resizable=no,top=200,left=450,width=600,height=400"
                )
              }
            >
              Logout
            </button>
          </a>
        ) : (
          <a href="http://localhost:8888/login">
            <button className="loginLogout">Login</button>
          </a>
        )}
        <button className="profileButton" />
        <span className="displayName">Display Name</span>
      </div>
    );
  }
}

const mapStateToProps = state => state.userReducer;

export default connect(
  mapStateToProps,
  { getUser }
)(TopNavBar);
