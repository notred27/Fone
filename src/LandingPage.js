
import SignIn from './SignIn.js';
import logoImg from './images/logo.png'


/**
 * Simple landing page with a button to sign in.
 */
function LandingPage() {
    return (
        <div>
            <img src = {logoImg} alt = "logo" style = {{width:"20vmax", paddingTop:"10vh", paddingBottom:"10vh", marginLeft:"auto", marginRight:"auto", display:"block", animationName:"logo-sway", animationIterationCount:"infinite", animationDuration:"3s"}} />
            
            <div className='centered' style={{width:"60%", backgroundColor:"white", borderRadius:"50px", padding:"10px"}}>
                <h1 style = {{fontSize:"2.5em", margin:"10px", width:"100%", textAlign:"center", fontWeight:"bold"}}>Fake Conversations, <span style={{color:"rgb(0, 102, 255)"}}>Real Projects.</span></h1>
                <p style={{fontSize:"1.5em", margin:"10px", textAlign:"center"}}>
                Have you ever tried to make a project that shows text messages, but found it hard to display what you want? With Fone, you can instantly customize the look of conversations with ease while messaging in real-time! From movie prop to prank, we've got you covered. 

                </p>
            </div>
            
            <br/>

            <SignIn />

        </div>
    );
}

export default LandingPage;