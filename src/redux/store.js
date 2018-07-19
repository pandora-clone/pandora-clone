import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import favReducer from "./favReducer";
import rctPlayedReducer from "./rctPlayedReducer";
import userReducer from "./userReducer";

const store = createStore(
  combineReducers({
    favReducer,
    rctPlayedReducer,
    userReducer
  }),
  applyMiddleware(promiseMiddleware())
);

export default store;
