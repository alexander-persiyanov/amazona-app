//sb-mm43it7991900@personal.example.com
//5?xlT44R
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import { signout } from './actions/userAction';
import CartScreen from './components/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';

function App() {

  const cart = useSelector(state=>state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = ()=>{
    
    dispatch(signout());
  }

  return (
  
   <BrowserRouter>
       <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">amazona</Link>
        </div>
        <div>
          <Link to="/cart">Cart  {cartItems.length>0 && ( 
          <span className="badge">{cartItems.length}</span>
          )} </Link>
          {
            userInfo ? (
              <div className="dropdown">
                <Link to="/#"> 
                {userInfo.name } <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile"> Profile </Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="/#signout" onClick={signoutHandler}> Sign Out</Link>
                  </li>
                </ul>
              </div>
              )
            :( <Link to="/signin">Sign In</Link>)
          }
         
        </div>
      </header>
      <main>
        <Route path="/product/:id" component={ProductScreen} ></Route>
        <Route path="/cart/:id?" component={CartScreen} ></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>

        <Route path="/" component={HomeScreen} exact></Route>
       
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
    
     
    
  );
}

export default App;
