import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import Artists from "./Components/Artists/Artists";
import Albums from "./Components/Albums/Albums";
import Genre from "./Components/Genre/Genre";
import Search from "./Components/Search/Search";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/artists" component={Artists} />
    <Route path="/albums" component={Albums} />
    <Route path="/genre" component={Genre} />
    <Route path="/search" component={Search} />
  </Switch>
);
