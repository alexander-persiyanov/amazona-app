
import {applyMiddleware, createStore,compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { productListReducer,productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';



const initialState = {
    cart:{
        cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
    }
};
const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
});


// link extension tool google chrome with redux
const  composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,initialState,composeEnchancer(applyMiddleware(thunk)));

export default store;
