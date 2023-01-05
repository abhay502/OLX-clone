import React,{useState,useContext} from 'react';
import {useHistory} from 'react-router-dom'
import {FirebaseContext} from '../../store/Context'
import Logo from '../../olx-logo.png';
import './Login.css';
import Swal from 'sweetalert2'

function Login() {
  const history=useHistory()
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {firebase}=useContext(FirebaseContext)
  const handleLogin=(e)=>{
    e.preventDefault()
    if (password.length>=6) {
      firebase.auth().signInWithEmailAndPassword(email,password).then(() => {
        history.push('/')
      }).catch((err) => {
        // alert(err)
        Swal.fire({
          icon: 'error',
          
          text: 'Invalid username or password',
         
        })
      });
    }else{
      Swal.fire({
        icon: 'error',
        
        text: 'Password must be 6 characters',
       
      })
    }

   
  } 
  const pushToSignUpPage=()=>{
    history.push('/signup')
  } 

  return (
    <div>
      
      <div className="loginParentDiv">
      
        <h4>User Login Page </h4>
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
         
          <br />
         Enter Email: <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            required
          />
          <br />
          
          <br />
          Enter Password:<input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            required
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <button  onClick={pushToSignUpPage}>Signup</button>
      </div>
    </div>
  );
}

export default Login;
