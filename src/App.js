import React, { Component } from "react";
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
