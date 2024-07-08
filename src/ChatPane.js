import React, {useState, useRef, useEffect} from 'react';
import './App.css';

import Message from './Message';
import Header from './Header';
import DateHeader from './DateHeader';
import Keyboard from './Keyboard';

import typing from './images/typing.gif'
import {query, orderBy, onSnapshot, limit, doc,  collection} from "firebase/firestore";
import {db, deleteMessage, sendMessage} from './firebase.js';


function ChatPane({chatroomId, exitRoom}) {
    const [messages, setMessages] = useState([]);
    const [isHidden, setIsHidden] = useState("none");
    const [debugMode, setDebugMode] = useState(false);

    const inputTextRef = useRef(null);
    const inputRadioRef = useRef(null);
    const scrollPaneRef = useRef(null);

    const [msgTheme, setMsgTheme] = useState("clientMsg")

    // Query Firebase DB and render recieved messages
    useEffect(() => {
        const q = query(
          collection(db, "Chatrooms", chatroomId, "messages"),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          const fetchedMessages = [];

          QuerySnapshot.forEach((doc) => {
            fetchedMessages.push({ ...doc.data(), id: doc.id });
          });

            setMessages(fetchedMessages.reverse());
            scrollPaneRef.current.scrollTop = scrollPaneRef.current.scrollHeight;

        });
        return () => unsubscribe;
      }, []);


    useEffect(() => {
        if(chatroomId !== null) {
            const q = query(doc(db, "Chatrooms", chatroomId))
            onSnapshot(q, (snapshot) => {
                setMsgTheme(snapshot.data().style);
            })
        }


    },[chatroomId])




    function sendDebugMessage(event, newMsg, msgType) {
        event.preventDefault();
        sendMessage(chatroomId, newMsg, msgType)
    }


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


    const renderedMessages = messages.map((item, idx) => {
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

            case "date":
                return <DateHeader  date = {item.text}
                                    time = {item.text}
                                    id = {item.id}
                                    key = {item.id} 

                                    btnStyle = {isHidden} />

            case "readFlair":
                return <div key = "readFlair" className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777"}}><span style={{ fontWeight:"bold"}}>{item["content"][0]}</span> {item["content"][1]}</div>
        }
    })


    // console.log(renderedMessages)
    renderedMessages.splice(messages.length, 0, <p  className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777", fontWeight:"bold"}}>Delivered</p>)

    return (
        <div style = {{height:"100%", width: "100%"}}>
            <div ref = {scrollPaneRef} className= "disable-scrollbars" style={{width:"100%", height:"calc(100% - 40px)", overflowY:"scroll", overscrollBehaviorY:"none"}}>
                <Header chatroomId = {chatroomId} hideFunc = {enterDebug} exitRoom = {exitRoom} />
            
                    {/* Header for Messages text */}
                    <div className='date'><span style={{fontWeight:"bold"}}>Text Message</span></div>

                    {renderedMessages}

                {/* These were two entries for the readFlare */}
                {/* <p  className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777", fontWeight:"bold"}}>Delivered</p> */}
                {/* <div className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777"}}><span style={{ fontWeight:"bold"}}>Read</span> 3:06 PM</div> */}
                <img src = {typing} style = {{position:"absolute", bottom:"40px"}}></img>
            </div>

            {debugMode ? 
            
            <div style = {{position:"sticky", bottom:"0px", padding:"10px", backgroundColor:"#ECECEC"}}>
                <form ref = {inputRadioRef} >
                    <input type="radio" id = "addType0" name="addType" value = "clientMsg" defaultChecked/>
                    <label >Blue Msg</label>

                    <input type="radio" id = "addType1" name="addType" value = "serverMsg"/>
                    <label >Gray Msg</label>

                    <input type="radio" id = "addType2" name="addType" value = "header"/>
                    <label >Timestamp</label>
                </form>

                <input id ="chat_adder" ref = {inputTextRef}></input>
                <button onClick={(event) => (sendDebugMessage(event, inputTextRef.current.value, inputRadioRef.current.elements["addType"].value))}>Add message</button>
            </div>

            :

            <Keyboard createMessage = {sendMessage} chatroomId = {chatroomId}  />}

        </div>

    )
}

export default ChatPane
