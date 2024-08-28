import signInImage from "./images/branding_guideline_sample_lt_rd_lg.svg";

import React from 'react';
import {auth} from './firebase.js';
import {useAuthState} from 'react-firebase-hooks/auth';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

// TODO: Improve look of the sign out button.

const SignIn = () => {
    const [user] = useAuthState(auth);  // Holds the user info of the current authenticated user

    /**
     * Sign into the application using Google authentication. This will create a popup window for the user to sign in.
     */
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
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
          <button onClick = {signOut} > Sign Out</button>
        }
      </div>

    )
}

export default SignIn;