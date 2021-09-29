import React, { useEffect, useState }  from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

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

    const submitHundler = (e)=>{
        e.preventDefault();
        dispatch(signin(email,password));

    }
    
    return(

        <div>
            {props.location.search}
           <form className="form" onSubmit={submitHundler}>
              
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
                    New customer ? <Link to="/register">Create your account</Link>
                   </div>
                  
               </div>
           </form>
            
        </div>
        );

}

export default SigninScreen;
