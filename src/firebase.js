import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";


console.log(process.env)

const FIREBASE_API_CONFIG = {

    apiKey: "AIzaSyDDWNc4FAG_CjvyEW9sL-uiLXjsvGgRzCk",
  
    authDomain: "joe-app-8330b.firebaseapp.com",
  
    projectId: "joe-app-8330b",
  
    storageBucket: "joe-app-8330b.appspot.com",
  
    messagingSenderId: "4705277287",
  
    appId: "1:4705277287:web:42a977395d0fef9d300bc2",
  
    measurementId: "G-WKLE7YY73N"
  
  };
  
  

// const FIREBASE_API_CONFIG = {

//     apiKey: process.env.REACT_APP_apiKey,
  
//     authDomain: process.env.REACT_APP_authDomain,
  
//     projectId: process.env.REACT_APP_projectId,
  
//     storageBucket: process.env.REACT_APP_storageBucket,
  
//     messagingSenderId: process.env.REACT_APP_messagingSenderId,
  
//     appId: process.env.REACT_APP_appId,
  
//     measurementId: process.env.REACT_APP_measurementId
  
//   }

const app = initializeApp(FIREBASE_API_CONFIG);
export const auth = getAuth(app)
export const db = getFirestore(app)