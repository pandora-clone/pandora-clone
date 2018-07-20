import axios from "axios";

const GET_USER = "GET_USER";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const initialState = {
  user: {}
};

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/user")
  };
}

export function login(display_name, id, email, images) {
  return {
    type: LOGIN,
    payload: axios.post("/api/login", { display_name, id, email, images })
  };
}
export function logout() {
  return {
    type: LOGOUT,
    payload: axios.post("/api/logout")
  };
}

export default function userReducer(state = initialState, action) {
  // console.log("action type: ", action.type);
  // console.log("action payload", action.payload);
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
    case `${LOGIN}_FULFILLED`:
    case `${LOGOUT}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    default:
      return state;
  }
}
