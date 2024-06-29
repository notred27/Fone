
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './firebase.js';
import LandingPage from './LandingPage.js';
import SignIn from './SignIn.js';
import ChatPane from './ChatPane.js';
import './App.css';




const App = () => {
    const [user] = useAuthState(auth);
    console.log(user)

// {/* <div>

// <SignIn />

// <div style={{width:"8cm", height:"15cm", overflow:"hidden", marginLeft:"auto", marginRight:"auto", backgroundColor:"white"}}>

//     <ChatPane/>
// </div>
// </div> */}

    return (
        <div>
            
            {!user ? <LandingPage /> :
            
            <div>
                <div className='flexRow'>
                    <p> Logged in as {user.displayName}</p>
                    <img src = {user.photoURL} alt = "userImg" style = {{width:"40px", height:"40px", borderRadius:"20px"}}></img>
                    <SignIn />
                </div>
                

                {/* <h2>Conversations</h2>
                <div style = {{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>

                <button className="convoCard"> + </button>
                <button className="convoCard"> + </button>
                <button className="convoCard"> + </button>

                </div> */}




                <div style={{width:"8cm", height:"15cm",  marginLeft:"auto", marginRight:"auto", backgroundColor:"white"}}>

                    <ChatPane/>
                </div>
            
            
            </div>
            
            }

        </div>
        

       )
}

export default App;