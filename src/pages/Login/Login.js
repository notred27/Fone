import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../../firebase.js';
import SignIn from '../../SignIn.js';
import logoImg from '../../assets/logo.png'

import '../../App.css';
import { useNavigate  } from "react-router-dom";



const Login = () => {
    const [user] = useAuthState(auth);
    const nav = useNavigate()



    // Prevent mobile users from exiting the app by pressing the back button
    document.addEventListener('backbutton', function(e) {e.preventDefault();})

    if(user) {
        console.log("logged in")
        nav("/home")
    }


    return (
        <div>

            {/* // Display the landing page if no user is currently loggged in  */}

            <img src = {logoImg} alt = "logo" style = {{width:"20vmax", paddingTop:"10vh", paddingBottom:"10vh", marginLeft:"auto", marginRight:"auto", display:"block", animationName:"logo-sway", animationIterationCount:"infinite", animationDuration:"3s"}} />
    
            <div className='centered' style={{maxWidth:"90%",backgroundColor:"white", borderRadius:"50px", padding:"10px"}}>
                <h1 style = {{fontSize:"2.5em", margin:"10px", width:"100%", textAlign:"center", fontWeight:"bold"}}>Fake Conversations, <span style={{color:"rgb(0, 102, 255)"}}>Real Projects.</span></h1>
                <p style={{fontSize:"1.5em", margin:"10px", textAlign:"center"}}>
                Have you ever tried to make a project that shows text messages, but found it hard to display what you want? With Fone, you can instantly customize the look of conversations with ease while messaging in real-time! From movie prop to prank, we've got you covered. 

                </p>
            </div>
            
            <br/>

            <SignIn />
        </div>
            
   )
}

export default Login;