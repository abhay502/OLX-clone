import React,{useContext} from 'react';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';

import './Header.css'; 
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
function Header() {
  const history=useHistory()
  const {user}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv"> 
        <div onClick={()=>history.push('/')} className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder='Kerala,India' />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <img src={user? user.photoURL :''} />
          <span onClick={()=>{
            {user ? history.push('/view-profile') :  history.push('/login')}
           
          }}>{user ? `Welcome ${user.displayName}`:'Login'}</span>
          <hr />
        </div>

        <span onClick={()=>{
         
          Swal.fire({
            title: 'Are you sure to Logout?',
            
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout!'
          }).then((result) => {
            if (result.isConfirmed) {
              firebase.auth().signOut()  
            
              Swal.fire(
               
                'Successfully LoggedOut',
               
              )
              history.push('/')
            }
          })
          
          
         
          
        }}>{user? 'Logout':''}</span>
        
        {user ?  <div onClick={()=>{
              history.push('/create')
            }} className="sellMenu">
          <SellButton></SellButton>
          <div  className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span >SELL</span>
          </div>
        </div>   :''}
       
      </div>
    </div>
  );
}

export default Header;
