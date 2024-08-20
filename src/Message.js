import React, {useRef, useState, useEffect} from 'react';
import { showMessage, hideMessage } from './firebase';
import './App.css';

import imessageTail from './images/imessageTail.png'
import smsTail from './images/smsTail.png'
import msgTail2 from './images/serverTail.png'
import {query, onSnapshot, doc} from "firebase/firestore";
import {db} from "./firebase.js"

function Message({id, msg, btnStyle,  msgStyle, removeFunc, chatroomId, tailShown = false}) {
    const messageRef = useRef(null)
    const [isShowing, setIsShowing] = useState(false)


    useEffect(() => {
        if(chatroomId !== null) {
            const q = query(doc(db, "Chatrooms", chatroomId, "messages", id))
            onSnapshot(q, (snapshot) => {
                setIsShowing(snapshot.data().isShowing);
            })
        }
    },[]);

    function showBody() {
        removeFunc(chatroomId, id);
    }

    function toggleMessageShow() {
        if(isShowing) {
            messageRef.current.style.opacity = "0.3"
            // messageRef.current.className = "HideButton"
            hideMessage(chatroomId, id)

        } else {
            messageRef.current.style.opacity = "1"
            // messageRef.current.className = ""
            showMessage(chatroomId, id)

        }
    }

    function toggleDebug() {
       
        btnStyle = "block";
       
    }


    let tail = <img src = {msgTail2} alt = "msg_tail_icon" style = {{position:"absolute", width:"20px", left:"2px", bottom:"-3px", zIndex:"0"}}></img>

    // TODO: Fix this so only the png needs to be swapped out
    if(msgStyle === "imessageClient") {
        tail = <img src = {imessageTail} alt = "msg_tail_icon" style = {{position:"absolute", width:"10px", right:"6px", bottom:"0px", zIndex:"0"}}></img>

    } else if (msgStyle === "smsClient") {
        tail = <img src = {smsTail} alt = "msg_tail_icon" style = {{position:"absolute", width:"10px", right:"6px", bottom:"0px", zIndex:"0"}}></img>
        
    } else if (msgStyle === "gmessageClient") {
        tail = <img src = {imessageTail} alt = "msg_tail_icon" style = {{position:"absolute", width:"10px", right:"6px", bottom:"0px", zIndex:"0"}}></img>
    } 
    

    return (
        <div ref = {messageRef} style = {{position:"relative", width:"100%", marginBottom:`${tailShown ? "10px" : "0px"}`, opacity:`${isShowing ? "1" : "0.3"}`, display:`${!isShowing && btnStyle == "none" ? "none" : "block"}`}}>
            <div className={`chatMsg ${msgStyle}`} >
                {msg}

                <div className='flexRow'>
                    <button className = "HideButton" onClick = {() => (showBody())} style = {{display:`${btnStyle}`, position:"relative"}}>Remove</button>
                    
                    { isShowing ? 
                        <button className = "HideButton" onClick = {() => {toggleMessageShow(); setIsShowing(false)}} style = {{display:`${btnStyle}`, position:"relative"}}>Hide</button>
                        :
                        <button className = "HideButton" onClick = {() => {toggleMessageShow(); setIsShowing(true)}} style = {{display:`${btnStyle}`, position:"relative"}}>Show</button>
                    }
                </div>
                                
            </div>

            {tailShown && tail}

        </div>
    );
}

export default Message;
