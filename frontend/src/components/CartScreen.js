import React from 'react';


function Cart (props){
  const productId = props.match.params.id;
  const qty = props.location.search? Number(props.location.search.split('=')[1]):1;
  
   

    return(
      <>
      <h1>Cart Screen </h1>
      <p>ADD TO CART : Product id: {productId} QTY: {qty}</p>
      
     
      </>
      

    );

}

export default Cart;
