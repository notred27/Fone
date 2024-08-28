
import SignIn from './SignIn.js';
import logoImg from './images/logo.png'

/**
 * Simple landing page with a button to sign in.
 */
// TODO: Add more information about this product?
function LandingPage() {
    return (
        <div>
            <img src = {logoImg} alt = "logo" style = {{width:"30vmax", paddingTop:"10vh", paddingBottom:"10vh", marginLeft:"auto", marginRight:"auto", display:"block", animationName:"logo-sway", animationIterationCount:"infinite", animationDuration:"3s"}} />
            <h2 style = {{width:"100%", textAlign:"center"}}> Get Started!</h2>
            <SignIn />

        </div>
    );
}

export default LandingPage;