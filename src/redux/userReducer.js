import axios from "axios";

const GET_USER = "GET_USER";
const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const initialState = {
  users: []
};

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/users")
  };
}
export function register(user_id, username, email) {
  return {
    type: REGISTER,
    payload: axios.post("/api/register", { user_id, username, email })
  };
}
export function login(user_id, username, email) {
  return {
    type: LOGIN,
    payload: axios.post("/api/login", { user_id, username, email })
  };
}
export function logout() {
  return {
    type: LOGOUT,
    payload: axios.post("/api/logout")
  };
}

export default function userReducer(state = initialState, action) {
  console.log("action type: ", action.type);
  console.log("action payload", action.payload);
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
    case `${LOGIN}_FULFILLED`:
    case `${REGISTER}_FULFILLED`:
    case `${LOGOUT}_FULFILLED`:
      return {
        ...state,
        users: action.payload.data
      };
    default:
      return state;
  }
}
