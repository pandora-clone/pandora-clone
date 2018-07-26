import React, { Component } from "react";
import TopNavBar from "./Components/NavBar/TopNavBar";
import SideNavBar from "./Components/NavBar/SideNavBar";
import routes from "./routes";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import "./App.css";

// import NavBar from "./Components/NavBar/NavBar";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            {/* <TopNavBar /> */}
            <SideNavBar />
            <div className="routes-wrapper">{routes}</div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
