import React, { useRef, useState, useEffect } from 'react';
import { showMessage, hideMessage, deleteItem, fileDeletion } from './firebase.js';
import { query, onSnapshot, doc } from "firebase/firestore";
import { db } from "./firebase.js"


import imessageTail from './images/imessageTail.png'
import smsTail from './images/smsTail.png'
import msgTail2 from './images/serverTail.png'


function ChatItemWrapper({data, chatroomId, chatroomStyle, isVisible}) {
    const [isShowing, setIsShowing] = useState(false);  // Boolean that represents if the "sender" can see this message when not in debug mode


    // Update the visibility of this item according to the Firestore database 
    useEffect(() => {
        if(chatroomId !== null) {
            const q = query(doc(db, "Chatrooms", chatroomId, "messages", data.id))
            onSnapshot(q, (snapshot) => {
                // Only try to read the field if the document exists
                if(snapshot._document !== undefined && snapshot._document !== null){
                    setIsShowing(snapshot.data().isShowing);
                }
            })
        }
    },[chatroomId, data.id]);



    /**
     * Delete the current Message object, and all references to it in Firebase.
     */
    function removeItemFromDatabase() {
        deleteItem(chatroomId, data.id);

        if(data.type === "sentImage" || data.type == "recievedImage") {
            fileDeletion(data.filename) // Remove file in Firebase Storage
        }
        
    }


    /**
     * Toggles if the item is currently hidden in the Firestore database
    */
    function toggleItemShow() {
        if(isShowing) {
            hideMessage(chatroomId, data.id)
            setIsShowing(false)
        } else {
            showMessage(chatroomId, data.id)
            setIsShowing(true)
        }
    }


/**
 * Render the appropriate chatroom item component based on the recieved data
 * @param {Object} data An object containing data from a firestore page
 * @returns {HTML} The HTML to render the object
 */
    function renderComponent(data) {
        switch(data.type) {
            default: return null;

            case "timestamp": return <div className='date'> <span style={{ fontWeight:"bold"}}>{data.date},</span><span>{data.time}</span></div>

            case "clientMsg": return <div className={`chatMsg ${chatroomStyle}Client`}>{data.text}</div>

            case "serverMsg": return <div className={`chatMsg ${chatroomStyle}Server`}>{data.text}</div>

            case "sentImage": 
                return <div className='imageContainer'>
                            <img className={`chatImg sentImg`} src = {data.url} alt = "msg_pic" />
                        </div>

            case "recievedImage": 
                return <div className='imageContainer'>
                            <img className={`chatImg recievedImage`} src = {data.url} alt = "msg_pic" />
                        </div>
        }
    }


    // FIXME: Fix this or take it down a component
    // TODO: Fix this so only the png needs to be swapped out?
    let tail = null;
    

    if(chatroomStyle === "imessage" || chatroomStyle === "sms"){
        if (data.type === "serverMsg") {
            tail = <img src = {msgTail2} alt = "msg_tail_icon" style = {{position:"absolute", width:"20px", left:"2px", bottom:"-3px", zIndex:"1"}}></img>

        } else if(chatroomStyle === "imessage") {
            tail = <img src = {imessageTail} alt = "msg_tail_icon" style = {{position:"absolute", width:"10px", right:"6px", bottom:"0px", zIndex:"1"}}></img>

        } else if (chatroomStyle === "sms") {
            tail = <img src = {smsTail} alt = "msg_tail_icon" style = {{position:"absolute", width:"10px", right:"6px", bottom:"0px", zIndex:"1"}}></img>
            
        } 
    }



    return (
        <div style = {{position:"relative", width:"100%", opacity:`${isShowing ? "1" : "0.3"}`, display:`${!isShowing && isVisible === "none" ? "none" : "block"}`}}>
            {renderComponent(data)}

            {/* FIXME: See above */}
            {data.tail && tail}

            <span className='flexRow'>
                <button className = "HideButton" onClick={removeItemFromDatabase} style = {{display:`${isVisible}`, position:"relative"}}>Remove</button>
                <button className = "HideButton" onClick = {toggleItemShow} style = {{display:`${isVisible}`, position:"relative"}}>{isShowing ? "Hide" : "Show"}</button>
            </span>

            

        </div>
    );
}

export default ChatItemWrapper;
