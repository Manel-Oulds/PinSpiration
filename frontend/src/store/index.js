import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import pinReducer from "./pin";
import userReducer from "./user";
import boardReducer from "./board";
import boardPinReducer from "./boardPins";
import searchReducer from "./search";
import followReducer from "./follow";

const rootReducer = combineReducers({
  session:sessionReducer,
  pin:pinReducer,
  users:userReducer,
  boards:boardReducer,
  boardpins: boardPinReducer,
  search: searchReducer,
  follows: followReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export default function configureStore(preloadedState = {}) {
  return createStore(rootReducer, preloadedState, enhancer);
}
