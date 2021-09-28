import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';


function SigninScreen (props){
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    useEffect(()=>{
       
    });

    const submitHundler = (e)=>{
        e.preventDefault();

    }
    
    return(

        <div>
           <form classNAm="form" onSubmit={submitHundler}>
               <div>
                   <h1>Sign In</h1>

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
