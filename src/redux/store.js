import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import favReducer from "./favReducer";
import rctPlayedReducer from "./rctPlayedReducer";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";

const store = createStore(
  combineReducers({
    favReducer,
    rctPlayedReducer,
    userReducer,
    searchReducer
  }),
  applyMiddleware(promiseMiddleware())
);

export default store;
