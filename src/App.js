import React, { Component } from "react";
<<<<<<< HEAD
import { HashRouter } from 'react-router-dom';
import TopNavBar from "./components/Navbar/TopNavBar";
import SideNavBar from "./components/Navbar/SideNavBar";
=======
import routes from "./routes";
import { BrowserRouter } from "react-router-dom";

>>>>>>> d1b340f4b180b29adb4cadf7f67f0bbcc47db16c
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";


class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <HashRouter>
        <div className="App">
          <TopNavBar />
          <SideNavBar />
        </div>
      </HashRouter>
=======
      <BrowserRouter>
        <div className="App">
          <NavBar />
          {routes}
        </div>
      </BrowserRouter>
>>>>>>> d1b340f4b180b29adb4cadf7f67f0bbcc47db16c
    );
  }
}

export default App;
