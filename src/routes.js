import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import Artists from "./Components/Artists/Artists";
import Albums from "./Components/Albums/Albums";
import Genre from "./Components/Genre/Genre";
import Search from "./Components/Search/Search";
import Songs from "./Components/Songs/Songs";
import Playlist from "./Components/Playlist/Playlist";
import UsersSongs from "./Components/UsersSongs/UsersSongs";
import AddSong from "./Components/AddSong/AddSong";
import AlbumSearch from "./Components/Search/AlbumSearch/AlbumSearch";
import ArtistTracks from "./Components/Search/ArtistTracks/ArtistTracks";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/artists" component={Artists} />
    <Route path="/albums" component={Albums} />
    <Route path="/genre/:categoryName" component={Genre} />
    <Route path="/playlist/:playListId" component={Playlist} />
    <Route path="/search" component={Search} />
    <Route path="/usersongs" component={UsersSongs} />
    <Route path="/addsong" component={AddSong} />
    <Route path="/songs" component={Songs} />
    <Route path="/album/:id" component={AlbumSearch} />
    <Route path="/artist/:id" component={ArtistTracks} />
  </Switch>
);
