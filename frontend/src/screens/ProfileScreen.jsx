import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constans/userCostans';

function ProfileScreen (props){
   const[name,setName] = useState(''); 
   const[email,setEmail] = useState(''); 
   const[password,setPassword] = useState(''); 
   const[confirmPassword,setConfirmPassword] = useState(''); 
    
   const userSignin = useSelector(state=>state.userSignin);
   const {userInfo} = userSignin;
   const userDetails = useSelector(state=>state.userDetails);
   const {error,loading,user} = userDetails;

   const userUpdateProfile = useSelector(state=>state.userUpdateProfile);
   const {loading:loadinUpdate,error:errorUpdate,success:successUpdate}  = userUpdateProfile;  

   const dispatch = useDispatch();
    useEffect(()=>{
        console.log("UseEffect");
        if(!user){
            dispatch({type:USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser (userInfo._id )); 
        }else{
            setName(user.name);
            setEmail(user.email);

        }
       
       
       
    },[dispatch,userInfo._id,user]);

    const submitHandler = (e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert("password and Conferm password are not match");

        }else{
            dispatch(updateUserProfile({userId:user._id,name,email,password}));
        }

    }; 

   
    
    return( 
            <form className="form" onSubmit={submitHandler}>
                <div>
                   <h1>User Details</h1>

               </div>
               {
                   loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> :(
                    <>
                        {loadinUpdate && <LoadingBox></LoadingBox>  }
                        {errorUpdate &&( <MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                        {successUpdate  && ( <MessageBox variant="success">Profile updated successfully</MessageBox>)}
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text"  id="name" placeholder="Enter name" value={name} onChange={e=>{setName(e.target.value)}}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email address</label>
                            <input type="email"  id="email" placeholder="Enter email" value={email} onChange={e=>{setEmail(e.target.value)}}/>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password"  id="password" placeholder="Enter password" onChange={e=>{setPassword(e.target.value)}} value={password} />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password"  id="confirmPassword" placeholder="Confirm your password" onChange={e=>{setConfirmPassword(e.target.value)}} value={confirmPassword}/>
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
