import signInImage from "./assets/branding_guideline_sample_lt_rd_lg.svg";

import React, { useState } from 'react';
import {auth} from './firebase.js';
import {useAuthState} from 'react-firebase-hooks/auth';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import PopupWrapper from "./PopupWrapper.js";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
    const [user] = useAuthState(auth);  // Holds the user info of the current authenticated user
    const [signingOut, setSigningOut] = useState(false)

    const nav = useNavigate()
    /**
     * Sign into the application using Google authentication. This will create a popup window for the user to sign in.
     */
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
        .then(() => (nav("/home")))
        .catch(error => {
          // TODO: Find a catch for this?
          console.log("Login Failed: ")
          console.log(error)
        })
    };

    /**
     * Sign out of the application using Google authentication.
     */
    const signOut = () => {
        auth.signOut();
    };



    return (
      <div>
        {/* Display the correct button depending on if the user is currently signed in */}
        {!user ? 
          <input src ={signInImage} type = "image" alt ="google_sign_in" onClick = {googleSignIn} className='centered' />
        :

        <span>
          <img src = {user.photoURL} alt = "userImg" style = {{width:"40px", height:"40px", borderRadius:"50px", marginRight:"10px"}} onClick = {() => (setSigningOut(true))}></img>

          {/* Popup menu for sign out confirmation */}
          {signingOut && <PopupWrapper>
            <div className="popupBg">
              <h3>Would you like to sign out?</h3>
              <span className='flexRow' style={{justifyContent: "center", alignItems: "center"}} >
                <button className="menuAccept" style={{marginRight:"20%"}} onClick = {() => {setSigningOut(false); signOut(); nav("/");}}> Sign Out </button>
                <button className="menuBack" onClick = {() => (setSigningOut(false))}> Back </button>
              </span>
            </div>
          </PopupWrapper>}
        </span>

        }
      </div>

    )
}

export default SignIn;