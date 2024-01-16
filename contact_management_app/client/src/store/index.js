import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { contactReducer } from "../redux/reducers/contactReducer";

const reducers = combineReducers({
  contacts:contactReducer
});
const initialState = {};

const middleware = [thunk];

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

// export default store