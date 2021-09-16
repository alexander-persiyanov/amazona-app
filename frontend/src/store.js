
import {applyMiddleware, createStore,compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { productListReducer,productDetailsReducer } from './reducers/productReducers';




const initialState = {};
const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
});


// link extension tool google chrome with redux
const  composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,initialState,composeEnchancer(applyMiddleware(thunk)));

export default store;
