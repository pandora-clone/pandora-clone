import axios from "axios";

const GET_RCT_PLAYED = "GET_RCT_PLAYED";
const ADD_RCT_PLAYED = "ADD_RCT_PLAYED";

const initialState = {
  rctPlayedList: []
};

export function getRctPlayed() {
  return {
    type: GET_RCT_PLAYED,
    payload: axios.get("/api/recent")
  };
}

export function addRctPlayed(trackId) {
  //   console.log("trackId: ", trackId);

  return {
    type: ADD_RCT_PLAYED,
    payload: axios.post("/api/recent", { trackId })
  };
}

export default function rctPlayedReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_RCT_PLAYED}_FULFILLED`:
      return {
        ...state,
        rctPlayedList: action.payload.data
      };
    case `${ADD_RCT_PLAYED}_FULFILLED`:
      return {
        ...state,
        rctPlayedList: action.payload.data
        // [action.payload.data, ...state.rctPlayedList]
      };
    default:
      return state;
  }
}
