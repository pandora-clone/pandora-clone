import React, { Component } from "react";
import { HashRouter } from 'react-router-dom';
import TopNavBar from "./components/Navbar/TopNavBar";
import SideNavBar from "./components/Navbar/SideNavBar";
import "./App.css";


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <TopNavBar />
          <SideNavBar />
        </div>
      </HashRouter>
    );
  }
}

export default App;
