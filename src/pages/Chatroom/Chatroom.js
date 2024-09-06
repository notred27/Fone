import React, {useState, useRef, useEffect} from 'react';

import ChatItemWrapper from '../../ChatItemWrapper.js';
import DebugMenu from './DebugMenu.js';

// import typing from './images/typing.gif'
import {query, orderBy, onSnapshot, limit, doc,  collection} from "firebase/firestore";
import {db} from '../../firebase.js';

import ImessageChatroom from './Themes/Imessage/ImessageChatroom.js';
import GmessageChatroom from './Themes/Gmessage/GmessageChatroom.js';
import WhatsappChatroom from './Themes/WhatsApp/WhatsappChatroom.js';

import { useParams, useNavigate } from 'react-router-dom';


import {CHATROOM_THEMES} from '../../index.js'


/**
 * A component that contains the functionality of a chatroom, and is linked to a specific Firestore database ID.
 * @param {Array<String, Function>} props The ID of the selected chatroom, and a function to set the value of the selected chatroom.
 */
function Chatroom() {
    const {chatroomId} = useParams();   // Holds the id of the current chatroom
    const nav = useNavigate();  // Navigate to /home 

    const [messages, setMessages] = useState([]);      //Array of internal objects that the user can see / interact with.
    const [isHidden, setIsHidden] = useState("none");  // Holds style information ("block" | "none") that determines if "hidden" components should be rendered.
    const [debugMode, setDebugMode] = useState(false); // Holds boolean for if the user is currently in debug mode.

    const [deliveredIdx, setDeliveredIdx] = useState(0);    // Holds the index of the last message that the user has sent.
    const [deliveredMsg, setDeliveredMsg] = useState("");   // Holds flair text (e.g., "Sent", "Seen") that may be displayed under the user's last sent message.


    const scrollPaneRef = useRef(null); // Holds a reference to the div that contains all message and content components


    // TODO: Make the styles into an enum (and export it) for ease of use
    const [msgTheme, setMsgTheme] = useState(CHATROOM_THEMES.imessage);  // Holds a string that represents what style the chatroom should be.

    // Set the chatroom theme on initial entry
    useEffect(() => {
        if(chatroomId !== null) {
            const q = query(doc(db, "Chatrooms", chatroomId))
            onSnapshot(q, (snapshot) => {
                setMsgTheme(snapshot.data().style);
                setDeliveredMsg(snapshot.data().messageflair);
            })
        }
    },[chatroomId]);


    function exitRoom() {
        nav("/home");
    }

    // FIXME: Error with updating scroll
    // useEffect(() => {
    //     const q = query(
    //         doc(db, "Chatrooms", chatroomId));

    //         console.log(q)
    // }, [])

    // Scroll to the most recent message when a new message is added / chatroom is entered
    // useEffect(() => {
    //     scrollPaneRef.current.scrollTop = scrollPaneRef.current.scrollHeight;
    // },[messages]);


    // Query Firebase DB and render received messages
    useEffect(() => {
        const q = query(
          collection(db, "Chatrooms", chatroomId, "messages"),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            // Find the index of the last message sent by the "display user".
            // OPTIMIZE: This inner method can probably be changed to be more efficient
            let idx = 0;
            let clientSeen = true
            let swap = null   //true means last message was a server message
            
            QuerySnapshot.forEach((doc) => {
            if(doc.data().type === "serverMsg" && clientSeen) {
                idx += 1;
            } else {
                clientSeen = false;
                setDeliveredIdx(idx)
            }

            if(!(doc.data().type === "serverMsg" || doc.data().type === "clientMsg")){
                swap = null;
            }

            if(swap == null && (doc.data().type === "serverMsg" || doc.data().type === "clientMsg")) {
                fetchedMessages.push({ ...doc.data(), id: doc.id, tail: true });
                swap = doc.data().type !== "serverMsg"
            }

            // If the next message does not match the type of the last message, make this new message have
            else if((doc.data().type === "serverMsg" && swap) || (doc.data().type === "clientMsg" && !swap)) {
                swap = !swap;
                fetchedMessages.push({ ...doc.data(), id: doc.id, tail: true });

            } else {
                fetchedMessages.push({ ...doc.data(), id: doc.id, tail: false });
            }
            });

            setMessages(fetchedMessages.reverse());
        });
        return () => unsubscribe;
        // FIXME: change this to depend on something?? I put db but this could be wrong
      }, [db]);


    /**
     * Toggles debug mode view for the user.
     */
    function enterDebug() {
        // TODO: Maybe just change this to a boolean and have lower classes handel the render?
        if (debugMode) {
            setIsHidden("none");
        } else {
            setIsHidden("block");
        }
        setDebugMode(!debugMode);

        // Hide all elements with the class "HideButton"
        let buttons = document.getElementsByClassName("HideButton")
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.display = isHidden
        }

        scrollPaneRef.current.scrollTop = scrollPaneRef.current.scrollHeight;
    }

    const renderedMessages = messages.map((item) => {
        return <ChatItemWrapper key = {item.id} data = {item} chatroomId = {chatroomId} chatroomStyle={msgTheme} isVisible = {isHidden} ></ChatItemWrapper>
    })

    // Insert the message flair into the list of rendered components
    renderedMessages.splice(messages.length - deliveredIdx, 0, <p  className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777", fontWeight:"bold"}}>{deliveredMsg}</p>)


    let roomUi = null;

    switch(msgTheme) {
        case CHATROOM_THEMES.imessage:
            roomUi = <ImessageChatroom chatroomId = {chatroomId} renderedMessages = {renderedMessages} enterDebug = {enterDebug} exitRoom = {exitRoom}></ImessageChatroom>
            break;

        case CHATROOM_THEMES.sms:
            roomUi = <ImessageChatroom chatroomId = {chatroomId} renderedMessages = {renderedMessages} enterDebug = {enterDebug} exitRoom = {exitRoom}></ImessageChatroom>
            break;

        case CHATROOM_THEMES.gmessage:
            roomUi = <GmessageChatroom chatroomId = {chatroomId} renderedMessages = {renderedMessages} enterDebug = {enterDebug} exitRoom = {exitRoom}></GmessageChatroom>
            break;

        case CHATROOM_THEMES.whatsapp:
            roomUi = <WhatsappChatroom chatroomId = {chatroomId} renderedMessages = {renderedMessages} enterDebug = {enterDebug} exitRoom = {exitRoom} />
            break;
    }


    // IDEA: Make separate chatPane objects depending on the style of the chatroom

    return (
        <div className='flexRow'>
            <div style = {{width:"min(100vw, 100vmin)", height:"100vh",  marginLeft:"auto", marginRight:"auto", backgroundColor:`${msgTheme === "gmessage"? "#10131a" :"white"}`, position:"relative"}}>
                <div ref = {scrollPaneRef} className= {`disable-scrollbars ${msgTheme}Bg`} >
                    {roomUi}
                </div>
            </div>

            {/* Display the debug menu to the right only when debug mode is active */}
            {debugMode && <DebugMenu chatroomId = {chatroomId} setDeliveredMsg = {setDeliveredMsg} />}

        </div>
    )
}

export default Chatroom;
