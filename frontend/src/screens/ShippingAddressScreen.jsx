import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import {saveShippingAddress} from '../actions/cartAction';

function ShippingAddressScreen (props){
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector(state=>state.cart);
    const {shippingAddress} = cart; 
//    console.dir(cart)
    if(!userInfo){
        props.history.push('/signin');
    }
   const [fullName,setFullName] = useState(shippingAddress.fullName);
   const [city,setCity] = useState(shippingAddress.city);
   const [address,setAddress] = useState(shippingAddress.address);
   const [postalCode,setPostalCode] = useState(shippingAddress.postalCode);
   const [country,setCountry] = useState(shippingAddress.country);

   

   const dispatch = useDispatch();
   

  const submitHandler = (e)=>{
    e.preventDefault(); 
    dispatch(saveShippingAddress({fullName,city,address,postalCode,country}));
    props.history.push('/payment');
  }

   
   
    useEffect(()=>{
     
       
    },[]);

  
    return(

        <div>
           <CheckoutSteps step1 step2 ></CheckoutSteps>
           <form className="form" onSubmit={submitHandler}>
               <div>
                   <h1>Shipping Address</h1>
               </div>
               <div>
                   <label htmlFor="fullName">Full Name</label>
                   {fullName}
                   <input
                    type="text" 
                    id="fullName" 
                    placeholder="enter full name" 
                    value={fullName} 
                    onChange={(e)=>setFullName(e.target.value)} 
                    required>
                    </input>


               </div>
               <div>
                   <label htmlFor="City">City</label>
                   {city}
                   <input
                    type="text" 
                    id="City" 
                    placeholder="enter city" 
                    value={city} 
                    onChange={(e)=>setCity(e.target.value)} 
                    required>
                    </input>


               </div>
               <div>
                   <label htmlFor="address">Address</label>
                   {address}
                   <input
                    type="text" 
                    id="address" 
                    placeholder="enter address" 
                    value={address} 
                    onChange={(e)=>setAddress(e.target.value)} 
                    required>
                    </input>


               </div>
               <div>
                   <label htmlFor="postalCode">Postal Code</label>
                   {postalCode}
                   <input
                    type="text" 
                    id="postalCode" 
                    placeholder="enter postal code" 
                    value={postalCode} 
                    onChange={(e)=>setPostalCode(e.target.value)} 
                    required>
                    </input>


               </div>
               <div>
                   <label htmlFor="country">Country</label>
                   {country}
                   <input
                    type="text" 
                    id="country" 
                    placeholder="enter country" 
                    value={country} 
                    onChange={(e)=>setCountry(e.target.value)} 
                    required>
                    </input>


               </div>
               <div>
                   <label />
                   <button className="primary" type="submit" >Continue</button>              
                </div>
               

           </form>
            
        </div>
        );

}

export default ShippingAddressScreen;
