import React, { useEffect, useState }  from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

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

    const submitHundler = (e)=>{
        e.preventDefault();

        if(confirmPassword !== password){
           alert("confirm password and password not match");
        }else{
            dispatch(register(name,email,password));
        }
      

        

    }
    
    return(

        <div>
            {props.location.search}
           <form className="form" onSubmit={submitHundler}>
              
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
                    Already heve account ? <Link to={`/signin?redirect=${redirect}` }>Sign-In</Link>
                   </div>
                  
               </div>
           </form>
            
        </div>
        );

}

export default RegisterScreen;
