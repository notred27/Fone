
import SignIn from './SignIn.js';

// import ChatPane from './ChatPane.js';
import logoImg from './images/logo.png'

import './App.css';


function LandingPage() {
 


    return (
        <div>
   
            <img src = {logoImg} alt = "logo" style = {{width:"30vmax", paddingTop:"10vh", paddingBottom:"10vh", marginLeft:"auto", marginRight:"auto", display:"block", animationName:"logo-sway", animationIterationCount:"infinite", animationDuration:"3s"}}></img>

            <h2 style = {{width:"100%", textAlign:"center"}}> Get Started!</h2>
            <SignIn />
                        
              
        </div>

    );
}

export default LandingPage;