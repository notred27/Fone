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
   
    return (
        <div>
            
            {!user ? <LandingPage /> :
            
            <div>
                <div className='flexRow'>
                    {selectedRoom == null ? 

                    <span></span>
                    :
                    
                    <button onClick={() => (setSelectedRoom(null))}> Back to Chatrooms</button>
                    }

                    <p> Logged in as {user.displayName}</p>
                    <img src = {user.photoURL} alt = "userImg" style = {{width:"40px", height:"40px", borderRadius:"20px"}}></img>
                    <SignIn />
                </div>
                

                

               


                {selectedRoom == null ? 
                    <div>
                        <h2>Conversations</h2>
                        <div style = {{display:"flex", flexDirection:"row", flexWrap:"wrap", textAlign:"center"}}>

                        {chatrooms.map((item, idx) => (
                            <div key = {idx}>
                                <button className="convoCard" onClick = {() => {console.log(item.id); setSelectedRoom(item.id)}}> ! </button>
                                <h6>{item.id}</h6>
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
                        <ChatPane chatroomId = {selectedRoom}/>
                    </div>
                }

                
            
            
            </div>
            
            }

        </div>
        

       )
}

export default App;