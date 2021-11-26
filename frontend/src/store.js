// import { data } from "../../backend/data";
import {applyMiddleware, createStore , compose, combineReducers} from 'redux';
// import data from './data'
import thunk from 'redux-thunk'
import { productListReducer } from './reducers/productReducers';
// import compose from 'redux'


const innitialState  = {};
const reducer = combineReducers({
  productLists: productListReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducer,innitialState , composeEnhancer(applyMiddleware(thunk)))

export default store;