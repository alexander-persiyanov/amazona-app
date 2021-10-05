import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute ({component:Component, ...rest}){
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin; 

   

    return(
        <Route {...rest} render={(props)=> userInfo ? (<Component {...props}></Component>) : (
            <Redirect to="/signin"></Redirect>
        )}>

        </Route>
       
    );

}

export default PrivateRoute;
