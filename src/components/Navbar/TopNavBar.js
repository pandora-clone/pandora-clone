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
          <a href="http://localhost:8888/logout"
              className="loginLogout"
              onClick={() =>
                window.open(
                  "https://accounts.spotify.com/en/logout?",
                  "_blank",
                  "toolbar=yes,scrollbars=no,resizable=no,top=200,left=450,width=600,height=400"
                )}>Log Out
          </a>
        ) : (
          <a href="http://localhost:8888/login"
            className="loginLogout">Log In
          </a>
        )}
        {this.props.user.profilePic ? (
          this.props.user.profilePic != null ? 
            <img className="profileButton" src={this.props.user.profilePic} alt="profilePic"/> 
            : 
            <img className="profileButton" src='https://gaia.ub.edu/twiki/pub/Main/UserProfileHeader/default-user-profile.jpg' alt="defaultPic"/>)
            : null}
        <div className="displayName">
          {this.props.user.username != null ? <span>{this.props.user.username}</span> : <span>{this.props.user.user_id}</span>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.userReducer;

export default connect(
  mapStateToProps,
  { getUser }
)(TopNavBar);
