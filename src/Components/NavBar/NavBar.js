import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/artists"> Artists </Link>
        <Link to="/albums"> Albums </Link>
        <Link to="/genre"> Genre </Link>
        <Link to="/search"> Search </Link>
      </div>
    );
  }
}

export default NavBar;
