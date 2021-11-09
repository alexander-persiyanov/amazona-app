import React, { useEffect, useState }  from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Formik } from 'formik';

function RegisterScreen (props){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const  UserRegister = useSelector((state)=>{return state.userRegister;});
    const {userInfo,error,loading} = UserRegister;

    const redirect = props.location.search ? props.location.search.split('=')[1]:'/';
    const dispatch = useDispatch();

    useEffect(()=>{
       
        if(userInfo){
           
            props.history.push(redirect);
        }
       
    },[props.history,redirect,userInfo]);

    // const submitHundler = (e)=>{
    //     e.preventDefault();

    //     if(confirmPassword !== password){
    //        alert("confirm password and password not match");
    //     }else{
    //         dispatch(register(name,email,password));
    //     }
    // }

    const submitFormikHundler = (values)=>{
        dispatch(register(values.name,values.email,values.password));
       
    }
    
    return(

        <div>
            {props.location.search}

            <Formik
                initialValues={{ name: '',email: '', password: '',confirmPassword:'' }}
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
                    if(!values.password){
                        errors.password = 'Password Required';
                    }else if(values.password.length<=2){
                        errors.password = 'Password length could be more 2 symbols';
                    }

                    if(!values.confirmPassword && values.password){
                        errors.confirmPassword = 'Confirm Password Required';
                    }
                    else if(values.confirmPassword.length>=1 && values.confirmPassword.length<=2){
                        errors.confirmPassword = 'Confirm password length could be more 2 symbols';
                    }
                    else if(values.confirmPassword!== values.password ){
                        errors.confirmPassword = 'Confirm password and password not match';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    submitFormikHundler(values);
                   
                    // setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    // }, 400);
                }}
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
                    <div><h1>Register</h1></div>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    <div>
                        <label htmlFor="name">Name</label>
                        
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder="Enter name"
                        />
                        {errors.name && touched.name && errors.name && <MessageBox variant="danger">{errors.name}</MessageBox>}
                      
                       
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Enter email"
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
                            Register
                        </button>
                    </div>
                    <div>
                        <label/>
                        <div>
                            Already have account ? <Link to={`/signin?redirect=${redirect}` }>Sign-In</Link>
                        </div>

                    </div>
                    
                    
                  
                    </form>
                )}
                </Formik>
                
           {/* <form className="form" onSubmit={submitHundler}>
              
               <div>
                   <h1>Register</h1>

               </div>
               {loading && <LoadingBox></LoadingBox>}
               {error && <MessageBox variant="danger">{error}</MessageBox>}
               <div>
                   <label htmlFor="name">Name</label>
                   <input type="text"  id="name" placeholder="Enter name" required onChange={e => setName(e.target.value)}/>
               </div>
               <div>
                   <label htmlFor="email">Email address</label>
                   <input type="email"  id="email" placeholder="Enter email" required onChange={e => setEmail(e.target.value)}/>
               </div>
               <div>
                   <label htmlFor="password">Password</label>
                   <input type="password"  id="password" placeholder="Enter password" required onChange={e => setPassword(e.target.value)}/>
               </div>
               <div>
                   <label htmlFor="confirmPassword">Confirm Password</label>
                   <input type="password"  id="confirmPassword" placeholder="Confirm your password" required onChange={e => setConfirmPassword(e.target.value)}/>
               </div>
               <div>
                   <label/>
                   <button className="primary" type="submit">Register</button>
               </div>
               <div>
                   <label/>
                   <div>
                    Already have account ? <Link to={`/signin?redirect=${redirect}` }>Sign-In</Link>
                   </div>
                  
               </div>
           </form> */}
            
        </div>
        );

}

export default RegisterScreen;
