import React, { useEffect, useState }  from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {Formik} from 'formik';

function SigninScreen (props){
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {error,loading,userInfo} = useSelector((state)=>{return state.userSignin});

    const redirect = props.location.search ? props.location.search.split('=')[1]:'/';
    
    // const userSignin = useSelector(state=>state.userSignin);
    // const {userInfo} = userSignin;

    const dispatch = useDispatch();
   
    useEffect(()=>{
       
        if(userInfo){
            props.history.push(redirect);
        }
       
    },[props.history,redirect,userInfo]);

    // const submitHundler = (e)=>{
    //     e.preventDefault();
    //     dispatch(signin(email,password));

    // }

    const submitFormikHundler = (values)=>{
      
        dispatch(signin(values.email,values.password));
    
    }
   
    
    return(

        <div>
            {props.location.search}


            <Formik
                initialValues={{ email: '', password: '', }}
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
                   
                    if(!values.password){
                        errors.password = 'Password Required';
                    }else if(values.password.length<=2){
                        errors.password = 'Password length could be more 2 symbols';
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
                    <div><h1>Sign In</h1></div>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                   
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Insert email"
                        />
                        {errors.email && touched.email && errors.email && <MessageBox variant="danger">{errors.email}</MessageBox>}
                    </div>
                    
                   
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
                        <label/>
                        <button className="primary" type="submit" disabled={isSubmitting}>
                            SignIn
                        </button>
                    </div>
                    <div>
                        <label/>
                        <div>
                            New customer ? <Link to={`/register?redirect=${redirect}` }>Create your account</Link>
                        </div>

                    </div>
                    
                    
                  
                    </form>
                )}
                </Formik>
          
           {/* <form className="form" onSubmit={submitHundler}>
              
               <div>
                   <h1>Sign In</h1>

               </div>
               {loading && <LoadingBox></LoadingBox>}
               {error && <MessageBox variant="danger">{error}</MessageBox>}
               <div>
                   <label htmlFor="email">Email address</label>
                   <input type="email"  id="email" placeholder="Enter email" required onChange={e => setEmail(e.target.value)}/>
               </div>
               <div>
                   <label htmlFor="password">Password</label>
                   <input type="password"  id="password" placeholder="Enter password" required onChange={e => setPassword(e.target.value)}/>
               </div>
               <div>
                   <label/>
                   <button className="primary" type="submit">SignIn</button>
               </div>
               <div>
                   <label/>
                   <div>
                    New customer ? <Link to={`/register?redirect=${redirect}` }>Create your account</Link>
                   </div>
                  
               </div>
           </form> */}
            
        </div>
        );

}

export default SigninScreen;
