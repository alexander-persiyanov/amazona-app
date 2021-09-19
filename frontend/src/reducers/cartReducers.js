import {CART_ADD_ITEM} from "../constans/cartCostans";


export const cartReducer = (state = {cartItems:[]},action)=>{

    switch(action.type ){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x)=>item.product === x.product);
            if(existItem){
                // add same item to cart for qty
                return {...state,cartItems:state.cartItems.map((x)=>x.product === existItem.product ? item : x)}
            }else{
                // add new item to cart
                return {...state, cartItems:[...state.cartItems,item]}
            }
        default:
                return state;
    }

};

