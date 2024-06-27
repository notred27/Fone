import React from 'react';
import {auth} from './firebase.js';
import {useAuthState} from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './App.css'
import signInImage from "./images/branding_guideline_sample_lt_rd_lg.svg";

const SignIn = () => {
    const [user] = useAuthState(auth);
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);

    };

    const signOut = () => {
        auth.signOut();
    };


    return (
      <div>
      {!user ? 
        <input src ={signInImage} type = "image" onClick = {googleSignIn} className='centered' />

        :
        <button onClick = {signOut} > Sign Out</button>


      }
      </div>

    )
}

export default SignIn;