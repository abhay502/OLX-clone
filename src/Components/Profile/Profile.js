import React,{useState,useContext} from 'react';
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../../store/Context'
import {FirebaseContext} from '../../store/Context'
import Logo from '../../olx-logo.png';
import './Profile.css';


function UserProfile() {
    const history=useHistory()
  const {user}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)

  const [username, setUsername] = useState('');
  const [email,setEmail]=useState('');
  const [image,setImage]=useState('')
  
   


  const handleSubmit=()=>{
    var user = firebase.auth().currentUser;

    // Create a Storage Ref w/ username
    firebase.storage().ref(`/profilePicture/${image.name}`).put(image).then(({ref})=>{
       ref.getDownloadURL().toString().then((url)=>{
        
        console.log(url)
        // firebase.firestore().collection('users').add({
         
        //   url,
        //   userId:user.uid,
          
        // })
        history.push('/')
      })
    })
    
   

   
     
        var userNow = firebase.auth().currentUser;
        userNow.updateProfile({
          displayName: username,
          // photoURL: 'nothing'
        }).then( ()=> {
          history.push('/')
          // var displayName = userNow.displayName;
          // var photoURL = userNow.photoURL;
        }, function (error) {
          console.log(error);
        });
          
       
       
   
    
   

    
  }
  const home=()=>{
    history.push('/')
  }

  return (
    <div>
      
    <div className='full'>
    <button onClick={home} className='btn btn-dark- '>← back</button>
      <img width="100px"  src={Logo}></img>
      <h3>Edit profile</h3>
      <hr />
      

      <div class="form-group">
        <h6>Basic-information</h6>
        <br />
    <label for="exampleInputEmail1">Username </label>
    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} class="form-control" placeholder={user ? user.displayName : ''}/>
  </div>



  <div class="form-group">
    <label for="exampleInputEmail1">Email </label>
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} class="form-control"  placeholder={user ? user.email:''} required/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
   
  </div>
  <form>
  <div class="form-group">
    <label for="exampleFormControlFile1">Select profile picture </label>
     <img  width="80px"  src={image ? URL.createObjectURL(image):''}></img>
   
    <input onChange={(e)=>{
        setImage(e.target.files[0])
    }}  type="file" class="form-control"  />

  </div>

  <button onClick={handleSubmit} className="uploadBtn">Save Changes</button>
</form>
     
    </div>
  </div>
  )
}

export default UserProfile