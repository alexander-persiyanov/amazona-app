import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {addToCart} from './../actions/cartAction';
function Cart (props){
  const productId = props.match.params.id;
  const qty = props.location.search? Number(props.location.search.split('=')[1]):1;
  const dispatch = useDispatch();

  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty));
    }
  },[dispatch,productId,qty]);
   

    return(
      <>
      <h1>Cart Screen </h1>
      <p>ADD TO CART : Product id: {productId} QTY: {qty}</p>
      
     
      </>
      

    );

}

export default Cart;
