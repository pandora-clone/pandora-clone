import React, { Component } from "react";
import routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <NavBar />
            {routes}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
