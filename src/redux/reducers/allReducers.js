import { combineReducers } from "redux";
import emptyReducer from "./emptyReducer";
import { routerReducer } from "react-router-redux";

const allReducers = combineReducers({
  emptyReducer: emptyReducer,
  router: routerReducer
});

export default allReducers;
