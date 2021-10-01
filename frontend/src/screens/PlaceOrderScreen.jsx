import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';



const PleceOrderScreen = (props)=>{
  
    const cart = useSelector((state) => state.cart);
    if(!cart.paymentMethod){
        props.history.push('/payment');
    }
    const toPrice = (num)=>{ return Number(num.toFixed(2)) };//5.123=>5.12=> to number 5.12
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a,c)=>a+c.qty *c.price,0)
    );

   

    cart.shippingPrice = cart.itemsPrice>100? toPrice(0) : toPrice(10);

    cart.taxPrice = toPrice(0.15 *cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


    const placeOrderHandler = ()=>{

    }


    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h1>Shipping</h1>
                                <p><strong>Name:</strong>{cart.shippingAddress.fullName}</p><br />
                                <p><strong>Address:</strong>{cart.shippingAddress.address}</p><br />
                              {cart.shippingAddress.city},  {cart.shippingAddress.country},
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h1>Payment</h1>
                                <p><strong>Method:</strong>{cart.paymentMethod}</p>
                               
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h1>Order items</h1>
                                <ul>
                                    {
                                        cart.cartItems.map((item)=>{
                                        return(
                                        <li key={item.product}>
                                            <div className="row">
                                            <div> <img src={item.image} alt={item.name} className="small"></img> </div>
                                        
                                            <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                           
                                            <div>{item.qty} x ${item.price} = ${item.qty*item.price}</div>
                                          
                                            </div>

                                        </li>);
                                        })
                                    }
                                </ul>
                            
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul> 
                            <li>
                                <h2>Order Summery</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li> 
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                           <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li> 
                            <li>
                                <div className="row">
                                    <div> <strong> Order Total</strong></div>
                                    <div>${cart.totalPrice.toFixed(2)}</div>
                                </div>
                            </li> 
                            <li>
                                <button className="primary" type="button block" onClick={placeOrderHandler} 
                                disabled={cart.cartItems.length ===0}>
                                    Place Order
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default PleceOrderScreen;