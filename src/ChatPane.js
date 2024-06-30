import React, {useState, useRef, useEffect} from 'react';
import './App.css';

import Message from './Message';
import Header from './Header';
import DateHeader from './DateHeader';
import Keyboard from './Keyboard';


import {query, orderBy, onSnapshot, limit, collection} from "firebase/firestore";
import {db, deleteMessage, sendMessage} from './firebase.js';


function ChatPane() {
    const [messages, setMessages] = useState([]);
    const [isHidden, setIsHidden] = useState("none");
    const [debugMode, setDebugMode] = useState(false);

    const inputTextRef = useRef(null);
    const inputRadioRef = useRef(null);
    const scrollPaneRef = useRef(null);


    // Query Firebase DB and render recieved messages
    useEffect(() => {
        const q = query(
          collection(db, "messages"),
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

    // Change structure so this is also triggered when debug mode is activated
    // useEffect(() => {
    // }, [messages]);
    


    function sendDebugMessage(event, newMsg, msgType) {
        event.preventDefault();
        sendMessage(newMsg, msgType)

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


    const renderedMessages = messages.map((item) => {
        switch(item.type) {
            default: return;

            case "clientMsg":
                return <Message msg = {item.text}
                                id = {item.id} 
                                key = {item.id} 

                                msgStyle = {"clientMsg"} 
                                btnStyle = {isHidden}
                                removeFunc = {deleteMessage} />

            case "serverMsg":
                return <Message msg = {item.text}
                                id = {item.id}
                                key = {item.id} 

                                msgStyle = {"serverMsg"}
                                btnStyle = {isHidden}
                                removeFunc = {deleteMessage} 
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





    return (
        <div style = {{height:"100%", width: "100%"}}>
            <div ref = {scrollPaneRef} className= "disable-scrollbars" style={{width:"100%", height:"calc(100% - 40px)", overflowY:"scroll", overscrollBehaviorY:"none"}}>
                <Header name = {"Joseph"} hideFunc = {enterDebug}/>
            
                    {/* Header for Messages text */}
                    <div className='date'><span style={{fontWeight:"bold"}}>Text Message</span></div>

                    {renderedMessages}

                {/* These were two entries for the readFlare */}
                {/* <p  className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777", fontWeight:"bold"}}>Delivered</p> */}
                {/* <div className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777"}}><span style={{ fontWeight:"bold"}}>Read</span> 3:06 PM</div> */}

            </div>

            {debugMode ? 
            
            <div className="HideButton" style = {{position:"sticky", bottom:"0px", padding:"10px", backgroundColor:"#ECECEC"}}>
                <form ref = {inputRadioRef} >
                    <input type="radio" id = "addType0" name="addType" value = "clientMsg"/>
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

            <Keyboard createMessage = {sendMessage} />}

        </div>

    )
}

export default ChatPane
