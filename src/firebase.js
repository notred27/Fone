import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";



const FIREBASE_API_CONFIG = {

    apiKey: process.env.REACT_APP_apiKey,
  
    authDomain: process.env.REACT_APP_authDomain,
  
    projectId: process.env.REACT_APP_projectId,
  
    storageBucket: process.env.REACT_APP_storageBucket,
  
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
  
    appId: process.env.REACT_APP_appId,
  
    measurementId: process.env.REACT_APP_measurementId
  
  }

const app = initializeApp(FIREBASE_API_CONFIG);
export const auth = getAuth(app)
export const db = getFirestore(app)