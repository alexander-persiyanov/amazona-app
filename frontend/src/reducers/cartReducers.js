import {CART_ADD_ITEM,CART_REMOVE_ITEM} from "../constans/cartConstans";


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
        case CART_REMOVE_ITEM :
           
           const filtered = state.cartItems.filter((item)=>{ return item.product!== action.payload.productId});
            return {...state, cartItems: filtered }
        default:
                return state;
    }

};

