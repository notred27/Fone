import React, {useState, useEffect} from 'react';
import {auth, db} from '../../firebase.js';
import SignIn from '../../SignIn.js';
import ConvoCard from './ConvoCard.js';
import AddChatroom from './AddChatroom.js';
import logo from '../../assets/logo.png';

import {query, orderBy, onSnapshot, limit, collection} from "firebase/firestore";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [user] = useAuthState(auth);
    const nav = useNavigate();

    // Initial check to see if user is logged in
    if(!user) {
        console.log("not logged in")
        nav("/")
    }

    const [chatrooms, setChatrooms] = useState([]);

    // Listen and return the currently visible chatrooms to the user
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

          setChatrooms(fetchedMessages.reverse());
        });
        return () => unsubscribe;
    }, []);

    
    return (
        <div>
            {/* Header bar that displays branding and the sign out button*/}
            <span id = "homeHeader" >
                <img src = {logo} alt = "logo_header" style = {{height:"40px"}}></img>
                    
                <span style={{alignItems:"right", marginLeft:"auto"}}> 
                    <SignIn />
                </span>
            </span>
            
            
            <h2 style={{marginLeft:"10px", textDecoration:"underline"}}>Conversations</h2>

            <div id = "convo_card_container" >
                <AddChatroom />  {/* The chatroom creation menu */}

                {chatrooms.map((item, idx) => (
                    <ConvoCard key = {idx} chatroomId={item.id} chatroomName={item.roomName} style = {item.style} />
                ))}
            </div>
        </div>
    )
}

export default Home;

