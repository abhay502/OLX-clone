import React, { useState,useContext } from 'react';
import Swal from 'sweetalert2'

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import {useHistory} from 'react-router-dom'

import './Signup.css';

export default function Signup() {
  const history=useHistory()
  const [username, setUsername] = useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  const [password,setPassword]=useState('');
  const [err,setError]=useState('')

const {firebase}=useContext(FirebaseContext) 

const pushToLoginPage=()=>{
  history.push('/login')
}
 
  const handleSubmit=(e)=>{
    e.preventDefault()
    // console.log(firebase)
    if(password.length<6){
       setError("Password must me 6 characters")
      
    }else{

    
    firebase.auth().createUserWithEmailAndPassword(email,password). catch((Error)=>{
      Swal.fire({
        icon: 'error',
        
        text: Error,
       
      })
     
    }).then((result)=>{
      if(result){
        result.user.updateProfile({displayName:username}).then(()=>{
          firebase.firestore().collection('users').add({
            id:result.user.uid,
            username:username,
            phone:phone
          }).then(()=>{
            history.push("/login")  
          })      
        })
      }else{
        history.push('/signup')
      }
     
    
    })
  }
    
    
  }  
 
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px"  src={Logo}></img>
        <h6 className='text-danger'>{err? err:''}</h6>
        <h4>User Signup page</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            required={true}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            required={true}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            required={true}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            required={true}
          />
          <br />
          <br />
          <button className='btns'>Signup</button>
        </form>
        <button onClick={pushToLoginPage} className='btns ' >Login</button>
      </div>
    </div>
  );
}
