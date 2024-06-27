import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from './SignIn';
import {auth} from './firebase.js';
import ChatPane from './ChatPane';
import logoImg from './images/logo.jpg'




function Welcome() {
    const [user] = useAuthState(auth);


    return (
        <div>
            {!user ? <div>
                
                        <img src = {logoImg} alt = "logo" style = {{width:"30vmax", paddingTop:"10vh", paddingBottom:"10vh", marginLeft:"auto", marginRight:"auto", display:"block", animationName:"logo-sway", animationIterationCount:"infinite", animationDuration:"3s"}}></img>

                        <h2 style = {{width:"100%", textAlign:"center"}}> Get Started!</h2>
                        <SignIn />
                        
                    </div>
            :
            
                    <div>

                        <SignIn />

                        <div style={{width:"8cm", height:"15cm", overflow:"hidden", marginLeft:"auto", marginRight:"auto", backgroundColor:"white"}}>

                            <ChatPane/>
                        </div>
                    </div>}
        </div>

    );
}

export default Welcome;