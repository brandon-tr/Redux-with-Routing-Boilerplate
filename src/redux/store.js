import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers/allReducers";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux/es";

export const history = createHistory();
const middleware = routerMiddleware(history);
export const store = createStore(reducer, applyMiddleware(middleware));
