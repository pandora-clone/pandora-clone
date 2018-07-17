import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import favReducer from "./favReducer";
import rctPlayedReducer from "./rctPlayedReducer";

const store = createStore(
  combineReducers({
    favReducer,
    rctPlayedReducer
  }),
  applyMiddleware(promiseMiddleware())
);

export default store;
