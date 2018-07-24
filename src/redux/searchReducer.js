import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

const initialState = {
  searchAlbums: [],
  searchArtists: [],
  searchPlaylists: [],
  searchTracks: []
};

const GET_ALBUMS = "GET_ALBUMS";
const GET_ARTISTS = "GET_ARTISTS";
const GET_PLAYLISTS = "GET_PLAYLISTS";
const GET_TRACKS = "GET_TRACKS";

export function getAlbums(searchTerm) {
  //   console.log("searchTerm: ", searchTerm);
  return {
    type: GET_ALBUMS,
    payload: spotifyApi.searchAlbums(searchTerm, { limit: 10 })
  };
}
export function getArtists(searchTerm) {
  return {
    type: GET_ARTISTS,
    payload: spotifyApi.searchArtists(searchTerm)
  };
}
export function getPlaylists(searchTerm) {
  return {
    type: GET_PLAYLISTS,
    payload: spotifyApi.searchPlaylists(searchTerm, { limit: 10 })
  };
}
export function getTracks(searchTerm) {
  return {
    type: GET_TRACKS,
    payload: spotifyApi.searchTracks(searchTerm)
  };
}

export default function searchReducer(state = initialState, action) {
  // console.log("action type", action.type);
  // console.log("action payload", action.payload);
  switch (action.type) {
    case "GET_ALBUMS_FULFILLED":
      return {
        ...state,
        searchAlbums: action.payload.albums.items
      };
    case "GET_ARTISTS_FULFILLED":
      return {
        ...state,
        searchArtists: action.payload.artists.items
      };
    case "GET_PLAYLISTS_FULFILLED":
      return {
        ...state,
        searchPlaylists: action.payload.playlists.items
      };
    case "GET_TRACKS_FULFILLED":
      return {
        ...state,
        searchTracks: action.payload.tracks.items
      };
    default:
      return state;
  }
}
