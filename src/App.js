import React, {useState, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './firebase.js';
import LandingPage from './LandingPage.js';
import SignIn from './SignIn.js';
import ChatPane from './ChatPane.js';
import ConvoCard from './ConvoCard.js';
import './App.css';

import {query, orderBy, onSnapshot, limit, collection} from "firebase/firestore";
import {db, createConversation, deleteConversation} from './firebase.js';


const App = () => {
    const [user] = useAuthState(auth);
    const [chatrooms, setChatrooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isHidden, setIsHidden] = useState(false)

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


    function enterChatroom(chatroomId) {
        setIsHidden(true);
        console.log("Entering chatroom " + chatroomId); 
        setSelectedRoom(chatroomId);
    }

    
   
    return (
        <div>
            {/* <div style={{position:"absolute", top:"calc(50vh - 100px)", left:"calc(50vw - 100px)", width:"30vw", height:"60vh", backgroundColor:"red"}}>
            </div> */}

            {!user ? <LandingPage /> :
            
            <div>

               


                {selectedRoom == null ? 
                    <div>

                        <div style ={{display:"grid", gridTemplateColumns:"50% 50%", alignItems:"center", backgroundColor:"#ececec", marginBottom:"20px", borderBottom:"2px solid #999999", padding:"5px"}} >
                            <div className='flexRow' style={{alignItems:"center", backgroundColor:"#65a0ff", padding:"5px", width:"fit-content", height:"fit-content", borderRadius:"20px", marginRight:"0px", marginLeft:"auto"}}> 
                                {/* <p> Logged in as {user.displayName}</p> */}
                                <img src = {user.photoURL} alt = "userImg" style = {{width:"40px", height:"40px", borderRadius:"20px", paddingRight:"5px"}}></img>
                                <SignIn />
                            </div>
                        </div>
                        
                        
                        <h2>Conversations</h2>

                        <div id = "convo_card_container" style = {{display:"flex", flexDirection:"row", flexWrap:"wrap", textAlign:"center"}}>
                            <div id = "add_new_conversation">
                                <button className="convoCard" onClick = {createConversation}> + </button>
                                <h5 style = {{margin:"0px", padding:"0px"}}>New Conversation</h5>
                            </div>

                            {chatrooms.map((item, idx) => (<ConvoCard key = {idx} chatroomId={item.id} chatroomName={item.roomName} style = {item.style} enterChatroom={enterChatroom}/>))}

                        </div>

                    </div>



                    :
                    
                    <div style={{width:"min(100vw, 100vmin)", height:"100vh",  marginLeft:"auto", marginRight:"auto", backgroundColor:"white"}}>
                        <ChatPane chatroomId = {selectedRoom} hideHead = {setIsHidden} exitRoom = {setSelectedRoom} />
                    </div>
                }

                
            
            
            </div>
            
            }

        </div>
        

       )
}

export default App;