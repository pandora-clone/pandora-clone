import axios from "axios";

const GET_FAV_LIST = "GET_FAV_LIST";
const ADD_FAV_LIST = "ADD_FAV_LIST";
const DELETE_FAV_LIST = "DELETE_FAV_LIST";

const initialState = {
  favList: []
};

export function getFavList(user_id) {
  // console.log(user_id);
  return {
    type: GET_FAV_LIST,
    payload: axios.get(`/api/fav/${user_id}`)
  };
}

export function addFavList(
  user_id,
  song_name,
  artist_name,
  img,
  preview_url,
  album_id,
  artist_id,
  track_id
) {
  return {
    type: ADD_FAV_LIST,
    payload: axios.post("/api/fav/new", {
      user_id,
      song_name,
      artist_name,
      img,
      preview_url,
      album_id,
      artist_id,
      track_id
    })
  };
}

export function deleteFavList(id) {
  // console.log(id);
  return {
    type: DELETE_FAV_LIST,
    payload: axios.delete(`/api/fav/${id}`)
  };
}

export default function favReducer(state = initialState, action) {
  // console.log(action.type);
  // console.log("payload!!!   ", action.payload);
  switch (action.type) {
    // get favList
    case "GET_FAV_LIST_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_FAV_LIST_FULFILLED":
      return {
        ...state,
        isLoading: false,
        favList: action.payload.data
      };
    case "GET_FAV_LIST_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //add favList
    case "ADD_FAV_LIST_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "ADD_FAV_LIST_FULFILLED":
      return {
        ...state,
        isLoading: false,
        favList: action.payload.data
      };
    case "ADD_FAV_LIST_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    // delete favList
    case "DELETE_FAV_LIST_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "DELETE_FAV_LIST_FULFILLED":
      return {
        ...state,
        isLoading: false,
        favList: action.payload.data
      };
    case "DELETE_FAV_LIST_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
