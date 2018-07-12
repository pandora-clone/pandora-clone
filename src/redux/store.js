import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import favReducer from "./favReducer";

const store = createStore(
  combineReducers({
    favList: favReducer
  }),
  applyMiddleware(promiseMiddleware())
);

export default store;
