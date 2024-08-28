import React, {useState, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './firebase.js';
import LandingPage from './LandingPage.js';
import SignIn from './SignIn.js';
import ChatPane from './ChatPane.js';
import ConvoCard from './ConvoCard.js';
import ChatroomMenu from './ChatroomMenu.js';
import logo from './images/logo.png'

import './App.css';

import {query, orderBy, onSnapshot, limit, collection} from "firebase/firestore";
import {db} from './firebase.js';


const App = () => {
    const [user] = useAuthState(auth);
    const [chatrooms, setChatrooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [chatroomPopupShowing, setChatroomPopupShowing] = useState(false);

    // Listen and return the currently visable chatrooms to the user
    useEffect(() => {
        const q = query(
          collection(db, "Chatrooms"),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          const fetchedMessages = [];

          QuerySnapshot.forEach((doc) => {
            fetchedMessages.push({ ...doc.data(), id: doc.id });
          });

          setChatrooms(fetchedMessages.reverse())
        });
        return () => unsubscribe;
    }, []);


    /**
     * Function passed down to lower components to change which chatroom (if any) is currently being displayed.
     * @param {String | null} chatroomId ID of the target chatroom, or null if no option is selected.
     */
    function enterChatroom(chatroomId) {
        setSelectedRoom(chatroomId);
    }

    // Prevent mobile users from exiting the app by pressing the back button
    document.addEventListener('backbutton', function(e) {e.preventDefault();})


    return (
        <div>
            { chatroomPopupShowing && <ChatroomMenu hidePopup = {setChatroomPopupShowing}/> }

            {!user ? 
                // Display the landing page if no user is currently loggged in 
                <LandingPage /> 
            
            :  
                // If a user is logged in, display the rest of the website
                <span >
                    {selectedRoom == null ? 
                        // If no chatroom is selected, display the chatroom select screen
                        // TODO: Make this into a separate component
                        <div>

                            <div style ={{display:"grid", gridTemplateColumns:" 50% 50%", alignItems:"center", backgroundColor:"#ececec", marginBottom:"20px", borderBottom:"2px solid #999999", padding:"5px"}} >
                                <img src = {logo} alt = "logo_header" style = {{height:"40px"}}></img>
                                
                                    
                                <div className='flexRow' style={{alignItems:"center", backgroundColor:"#65a0ff", padding:"5px", width:"fit-content", height:"fit-content", borderRadius:"20px", marginRight:"0px", marginLeft:"auto"}}> 
                                    <img src = {user.photoURL} alt = "userImg" style = {{width:"40px", height:"40px", borderRadius:"20px", paddingRight:"5px"}}></img>
                                    <p>{user.displayName}</p>

                                    <SignIn />
                                </div>
                            </div>
                            
                            
                            <h2 style={{marginLeft:"10px", textDecoration:"underline"}}>Conversations</h2>

                            <div id = "convo_card_container" style = {{display:"flex", flexDirection:"row", flexWrap:"wrap", textAlign:"center"}}>

                                <div className='conversationCard' style = {{display:"flex", justifyContent:"center", alignItems:"center", width:"250px", height:"215px", margin:"10px", backgroundColor:"white", borderRadius:"20px", boxShadow:"-2px 2px 2px gray"}} onClick = {() => (setChatroomPopupShowing(true))}>
                                    <h3>Create New<br/>Conversation!</h3>
                                </div>

                                {chatrooms.map((item, idx) => (<ConvoCard key = {idx} chatroomId={item.id} chatroomName={item.roomName} style = {item.style} enterChatroom={enterChatroom}/>))}


                            </div>

                        </div>

                    :
                        // If a chatroom is selected, display that chatroom to the user
                        <ChatPane chatroomId = {selectedRoom} exitRoom = {setSelectedRoom} />
                        
                    }

                </span>
                
            }

        </div>
        

       )
}

export default App;