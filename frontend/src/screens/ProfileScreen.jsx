import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function ProfileScreen (props){
   const dispatch = useDispatch();
   const userSignin = useSelector(state=>state.userSignin);
   const {userInfo} = userSignin;
   const userDetails = useSelector(state=>state.userDetails);
   const {error,loading,user} = userDetails;

    useEffect(()=>{
        dispatch(detailsUser (userInfo._id )); 
       
       
    },[dispatch,userInfo._id]);

    const submitHandler = (e)=>{
        e.preventDefault();

    }; 

   
    
    return( 
            <form className="form" onSubmit={submitHandler}>
                <div>
                   <h1>User Details</h1>

               </div>
               {
                   loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> :(
                    <>

                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text"  id="name" placeholder="Enter name" value={user.name}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email address</label>
                            <input type="email"  id="email" placeholder="Enter email" value={user.email}/>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password"  id="password" placeholder="Enter password" />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password"  id="confirmPassword" placeholder="Confirm your password"/>
                        </div>
                        <div>
                            <label/>
                            <button className="primary" type="submit">Update</button>
                        </div>
                       
                    
                    </>

                   )
               }
              
              


            </form>

       
        );

}

export default ProfileScreen;
