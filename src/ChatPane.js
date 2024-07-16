import React, {useState, useRef, useEffect} from 'react';
import './App.css';

import Message from './Message';
import Header from './Header';
import DateHeader from './DateHeader';
import Keyboard from './Keyboard';
import DebugMenu from './DebugMenu.js';
import Image from './Image.js'

import typing from './images/typing.gif'
import {query, orderBy, onSnapshot, limit, doc,  collection} from "firebase/firestore";
import {db, deleteMessage, sendMessage} from './firebase.js';


function ChatPane({chatroomId, exitRoom}) {
    const [messages, setMessages] = useState([]);
    const [isHidden, setIsHidden] = useState("none");
    const [debugMode, setDebugMode] = useState(false);


    const [deliveredIdx, setDeliveredIdx] = useState(0);
    const [deliveredMsg, setDeliveredMsg] = useState("");

    const [msgTheme, setMsgTheme] = useState("clientMsg");


    const scrollPaneRef = useRef(null);


    // Query Firebase DB and render recieved messages
    useEffect(() => {
        const q = query(
          collection(db, "Chatrooms", chatroomId, "messages"),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          const fetchedMessages = [];

          let idx = 0;
          let clientSeen = true

          QuerySnapshot.forEach((doc) => {
            if(doc.data().type === "serverMsg" && clientSeen) {
                idx += 1;
            } else {
                clientSeen = false;
                setDeliveredIdx(idx)
            }

            fetchedMessages.push({ ...doc.data(), id: doc.id });
          });


            setMessages(fetchedMessages.reverse());

        });
        return () => unsubscribe;
      }, []);


    //   Set chatroom theme on initial entry
    useEffect(() => {
        if(chatroomId !== null) {
            const q = query(doc(db, "Chatrooms", chatroomId))
            onSnapshot(q, (snapshot) => {
                setMsgTheme(snapshot.data().style);
                setDeliveredMsg(snapshot.data().messageflair);
            })



        }
    },[chatroomId]);


    // Scroll to the most recent message when a new message is added / chatroom is entered
    useEffect(() => {
        scrollPaneRef.current.scrollTop = scrollPaneRef.current.scrollHeight;

    },[messages]);



   

    function enterDebug() {
        if (debugMode) {
            setIsHidden("none");
        } else {
            setIsHidden("block");
        }
        setDebugMode(!debugMode);

        let buttons = document.getElementsByClassName("HideButton")
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.display = isHidden
        }

        scrollPaneRef.current.scrollTop = scrollPaneRef.current.scrollHeight;
    }


    const renderedMessages = messages.map((item) => {
        switch(item.type) {
            default: return null;

            case "clientMsg":
                return <Message msg = {item.text}
                                id = {item.id} 
                                key = {item.id} 

                                msgStyle = {msgTheme + "Client"} 
                                btnStyle = {isHidden}
                                removeFunc = {deleteMessage}
                                chatroomId = {chatroomId} />

            case "serverMsg":
                return <Message msg = {item.text}
                                id = {item.id}
                                key = {item.id} 

                                msgStyle = {"serverMsg"}
                                btnStyle = {isHidden}
                                removeFunc = {deleteMessage} 
                                chatroomId = {chatroomId}
                                />

            case "timestamp":
                return <DateHeader  date = {item.date}
                                    time = {item.time}
                                    id = {item.id}
                                    key = {item.id} 

                                    btnStyle = {isHidden} />

            case "readFlair":
                return <div key = "readFlair" className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777"}}><span style={{ fontWeight:"bold"}}>{item["content"][0]}</span> {item["content"][1]}</div>

            case "sentImage":

                return <Image imageType = {"sentImg"} id = {item.id} key = {item.id} url = {item.url} chatroomId={chatroomId} btnStyle={isHidden} removeFunc = {deleteMessage}/>

            case "recievedImage":

                return <Image imageType = {"recievedImg"} id = {item.id} key = {item.id} url = {item.url} chatroomId={chatroomId} btnStyle={isHidden} removeFunc = {deleteMessage}/>
                


        }
    })


    renderedMessages.splice(messages.length - deliveredIdx, 0, <p  className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777", fontWeight:"bold"}}>{deliveredMsg}</p>)

    return (
        <div className='flexRow'>

            <div style = {{width:"min(100vw, 100vmin)", height:"100vh",  marginLeft:"auto", marginRight:"auto", backgroundColor:"white", position:"relative"}}>
                <div ref = {scrollPaneRef} className= "disable-scrollbars" style={{width:"100%", height:"calc(100% - 40px)", overflowY:"scroll", overscrollBehaviorY:"none"}}>
                    <Header chatroomId = {chatroomId} hideFunc = {enterDebug} exitRoom = {exitRoom} />
                
                        {/* Header for Messages text */}
                        <div className='date'><span style={{fontWeight:"bold"}}>Text Message</span></div>

                        {renderedMessages}
                </div>

                <Keyboard createMessage = {sendMessage} chatroomId = {chatroomId}  />
            </div>

            {debugMode && <DebugMenu chatroomId = {chatroomId} setDeliveredMsg = {setDeliveredMsg} />}

        </div>
    )
}

export default ChatPane;
