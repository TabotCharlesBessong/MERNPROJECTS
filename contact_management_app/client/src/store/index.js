import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({});
const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store