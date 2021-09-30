import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import {savePaymentMethod} from '../actions/cartAction';

function PaymentMethodScreen (props){
    const cart = useSelector((state)=>state.cart);
    const {shippingAddress} = cart; 
    if(!shippingAddress.address){
        props.history.push("/shipping");
    }
    const [paymentMethod,setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
   

    const submitHandler = (e)=>{
        e.preventDefault(); 
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }

   
   
    useEffect(()=>{
     
       
    },[]);

  
    return(

        <div>
           <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
           <form className="form" onSubmit={submitHandler}>
               <div>
                   <h1>Payment</h1>
               </div>
               <div>
                 <div>
                    <input
                        type="radio" 
                        id="paypal" 
                        value="PayPal"
                        name="paymentMethod"
                        onChange={(e)=>setPaymentMethod(e.target.value)} 
                        required
                        checked>
                        </input>
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                   
               </div>
               <div>
                 <div>
                    <input
                        type="radio" 
                        id="stripe" 
                        value="Stripe"
                        name="paymentMethod"
                        onChange={(e)=>setPaymentMethod(e.target.value)} 
                        required
                        >
                        </input>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                   
               </div>
               <div>
                   <label />
                   <button className="primary" type="submit" >Continue</button>              
                </div>
               

           </form>
            
        </div>
        );

}

export default PaymentMethodScreen;
