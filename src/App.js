import React, {useState, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './firebase.js';
import LandingPage from './LandingPage.js';
import SignIn from './SignIn.js';
import ChatPane from './ChatPane.js';
import './App.css';

import {query, orderBy, onSnapshot, limit, collection} from "firebase/firestore";
import {db, createConversation} from './firebase.js';


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

          setChatrooms(fetchedMessages)
        });
        return () => unsubscribe;
      }, []);


    function enterChatroom(item) {
        setIsHidden(true);
        console.log("Entering chatroom " + item.id); 
        setSelectedRoom(item.id);
    }

    
   
    return (
        <div>
            
            {!user ? <LandingPage /> :
            
            <div>


                {isHidden ? <span></span> :
                
                <div style ={{display:"grid", gridTemplateColumns:"20% 60% 20%", alignItems:"center", backgroundColor:"#ececec", marginBottom:"20px", borderBottom:"2px solid #999999", padding:"5px"}} >
                    {selectedRoom == null ? 

                    <span></span>
                    :
                    
                    <button style={{width:"fit-content"}} onClick={() => (setSelectedRoom(null))}> Back to Chatrooms</button>
                    }

                    <span></span>

                    <div className='flexRow' style={{alignItems:"center", backgroundColor:"#65a0ff", padding:"5px", width:"fit-content", height:"fit-content", borderRadius:"20px", marginRight:"0px", marginLeft:"auto"}}> 
                        {/* <p> Logged in as {user.displayName}</p> */}
                        <img src = {user.photoURL} alt = "userImg" style = {{width:"40px", height:"40px", borderRadius:"20px", paddingRight:"5px"}}></img>
                        <SignIn />
                    </div>
                </div>
                
                }
                

               


                {selectedRoom == null ? 
                    <div>
                        <h2>Conversations</h2>
                        <div style = {{display:"flex", flexDirection:"row", flexWrap:"wrap", textAlign:"center"}}>

                        {chatrooms.map((item, idx) => (
                            <div key = {idx} style={{position:"relative"}}>
                                <button className="convoCard" onClick = {() => {enterChatroom(item)}}> ! </button>
                                <h6>{item.id}</h6>

                                {/* TODO: Make a toggle for delete mode and add a confirmation dialogue */}
                                <button onClick={() => console.log("remove chatroom: " + item.id)} style = {{position:"absolute", top:"0", right:"0", backgroundColor:"#fc8397", color:"#ECECEC", border:"4px solid #ECECEC", fontWeight:"bold", borderRadius:"50px"}}>x</button>
                            </div>
                            
                            ))}

                            <div>
                                {/* createConversation().then((val) => console.log(val)) */}
                                <button className="convoCard" onClick = {createConversation}> + </button>
                                <h6>New Conversation</h6>
                            </div>

                        </div>

                    </div>
                    :
                    
                    <div style={{width:"min(100vw, 100vmin)", height:"100vh",  marginLeft:"auto", marginRight:"auto", backgroundColor:"white"}}>
                        <ChatPane chatroomId = {selectedRoom} hideHead = {setIsHidden} />
                    </div>
                }

                
            
            
            </div>
            
            }

        </div>
        

       )
}

export default App;