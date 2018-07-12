import React, { Component } from "react";
import { HashRouter } from 'react-router-dom';
import TopNavBar from "./components/Navbar/TopNavBar";
import SideNavBar from "./components/Navbar/SideNavBar";
import routes from "./routes";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import NavBar from "./Components/NavBar/NavBar";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
