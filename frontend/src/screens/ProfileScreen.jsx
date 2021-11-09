import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET,USER_DETAILS_RESET } from '../constans/userCostans';
import {Formik} from 'formik';

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

    useEffect(()=>{
         //unmount component 
        return () => {
            dispatch({type:USER_DETAILS_RESET});
            
            console.log("unmount")
        };
    },[])
   

    const submitHandler = (e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert("password and Conferm password are not match");

        }else{
          
            dispatch(updateUserProfile({userId:user._id,name,email,password}));
        }

    }; 

    const submitFormikHandler = (values)=>{
      
    //    console.dir({userId:user._id,name:values.name,email:values.email,password:values.password});
        dispatch(updateUserProfile({userId:user._id,name:values.name,email:values.email,password:values.password}));
        

    }; 

   
    
    return( 
<>
        <Formik
            enableReinitialize={true} 
            initialValues={{ name, email, password: '',confirmPassword:'' }}
            validateOnBlur
            validate={values => {
                const errors = {};
                if (!values.email) {
                errors.email = 'Email Required';
                } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'Invalid email address';
                }
                if(!values.name){
                    errors.name = 'Name Required';
                }
               
                if(values.password.length>=1 && values.password.length<=2){
                    errors.password = 'Password length could be more 2 symbols';
                }

                if(!values.confirmPassword && values.password){
                    errors.confirmPassword = 'Password Required';

                }
                else if( values.confirmPassword.length>=1 && values.confirmPassword.length<=2){
                    errors.confirmPassword = 'Confirm password length could be more 2 symbols';
                }
                else if(values.confirmPassword!== values.password ){
                    errors.confirmPassword = 'Confirm password and password not match';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                console.dir(values);
                submitFormikHandler(values);
            
                // setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                // }, 400);
            }}
            onChange={
                (e)=>{
                    console.dir(e.target.value);
                }
            }
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
                dirty
                /* and other goodies */
            }) => (
                <form className="form"   onSubmit={handleSubmit}>
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
                            
                            <input
                                type="text"
                                name="name"
                                onChange={(e)=>{handleChange(e)}}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder="Insert name"
                            />
                            {errors.name && touched.name && errors.name && <MessageBox variant="danger">{errors.name}</MessageBox>}
                        
                        
                        </div>
                        <div>
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="Insert email"
                            />
                        </div>
                        
                        {errors.email && touched.email && errors.email && <MessageBox variant="danger">{errors.email}</MessageBox>}
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder="Insert password"
                            />

                            {errors.password && touched.password && errors.password && <MessageBox variant="danger">{errors.password}</MessageBox>}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                placeholder="Confirm your password" 
                            
                            />

                            {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword && <MessageBox variant="danger">{errors.confirmPassword}</MessageBox>}
                        </div>
                        <div>
                            <label/>
                            <button className="primary" type="submit" disabled={isSubmitting}>
                                Update
                            </button>
                        </div>
                    </>
                    )
                }
               
                
                
                
            
                </form>
            )}
            </Formik>
           
{/*            
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
              
              


            </form> */}
            </>
       
        );

}

export default ProfileScreen;
