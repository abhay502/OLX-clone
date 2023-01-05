
import firebase from "firebase"; 
import 'firebase/auth' 
import 'firebase/firebase' 
import 'firebase/storage' 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCyuHvzX7-SHGzjTOhKDFkh3FqcFtnQQog",
    authDomain: "fir-686c4.firebaseapp.com",
    projectId: "fir-686c4",
    storageBucket: "fir-686c4.appspot.com",
    messagingSenderId: "415600966038",
    appId: "1:415600966038:web:841935380446cf5a8e05b7",
    measurementId: "G-0FK06XHGWY"
  }; 


 export default firebase.initializeApp(firebaseConfig)