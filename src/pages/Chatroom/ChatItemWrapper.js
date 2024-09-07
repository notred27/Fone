import React, { useState, useEffect } from 'react';
import { query, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase.js"

import {removeChatComponent, removeImage, setMessageVisibility} from './ChatItemMethods.js'

import imessageTail from '../../assets/imessageTail.png'
import smsTail from '../../assets/smsTail.png'
import msgTail2 from '../../assets/serverTail.png'


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
     * Delete the current chat item object, and all references to it in Firebase.
     */
    function removeItemFromDatabase() {
        removeChatComponent(chatroomId, data.id);

        if(data.type === "sentImage" || data.type === "recievedImage") {
            removeImage(data.filename) // Remove file in Firebase Storage
        }
        
    }


    /**
     * Toggles if the item is currently hidden in the Firestore database
    */
//    TODO: Fix this method
    function toggleItemShow() {
        if(isShowing) {
            setMessageVisibility(chatroomId, data.id, false)
            setIsShowing(false)
        } else {
            setMessageVisibility(chatroomId, data.id, true)
            setIsShowing(true)
        }
    }


/**
 * Render the appropriate chatroom item component based on the recieved data
 * @param {Object} data An object containing data from a firestore page
 * @returns {HTML} The HTML to render the object
 */
    function renderComponent(data) {
        switch(data.obj) {
            default: return null;

            case "Timestamp": return <div className='date'> <span style={{ fontWeight:"bold"}}>{data.date},</span><span>{data.time}</span></div>

            case "Message":
                return <div className={`chatMsg ${chatroomStyle}_${data.type}`}>{data.text}</div>


            case "Image": 
                return <div className='imageContainer'>
                            <img className={`chatImg ${data.type}Image`} src = {data.url} alt = "msg_pic" />
                        </div>

        }
    }


    // FIXME: Fix this or take it down a component
    // TODO: Fix this so only the png needs to be swapped out?
    let tail = null;
    

    if(chatroomStyle === "imessage" || chatroomStyle === "sms"){
        if (data.type === "server") {
            tail = <img src = {msgTail2} alt = "msg_tail_icon" style = {{position:"absolute", width:"10px", left:"6px", bottom:"-1px", zIndex:"1"}}></img>

        } else if(chatroomStyle === "imessage") {
            tail = <img src = {imessageTail} alt = "msg_tail_icon" style = {{position:"absolute", width:"10px", right:"6px", bottom:"0px", zIndex:"1"}}></img>

        } else if (chatroomStyle === "sms") {
            tail = <img src = {smsTail} alt = "msg_tail_icon" style = {{position:"absolute", width:"10px", right:"6px", bottom:"0px", zIndex:"1"}}></img>
            
        } 
    }

    console.log(data)

    // Position the hide/remove buttons according to the item's position
    let btnPosition = ""
    switch(data.type) {
        case "client": 
            btnPosition = "flex-end"
            break;

        case "server": 
            btnPosition = "flex-start"
            break;

        default: 
            btnPosition = "center";
            break;
    }




    return (
        <div style = {{position:"relative", width:"100%", opacity:`${isShowing ? "1" : "0.3"}`, display:`${!isShowing && isVisible === "none" ? "none" : "block"}`}}>
            
            
            <div style={{position:"relative"}}>
                {renderComponent(data)}

                {/* FIXME: See above */}
                {data.tail && tail}
            </div>

            {/* IDEA: In each firestore object, have a boolean that represents if it was sent by the client, reciever, or system. 
                        This eliminates redundant naming schemes, and would make it easier to set things like the just.Content tag below */}
            
            <span className='flexRow' style={{justifyContent:`${btnPosition}`, marginBottom:"2px"}}>
                <button className = "HideButton" onClick={removeItemFromDatabase} style = {{display:`${isVisible}`, position:"relative"}}>Remove</button>
                <button className = "HideButton" onClick = {toggleItemShow} style = {{display:`${isVisible}`, position:"relative"}}>{isShowing ? "Hide" : "Show"}</button>
            </span>
            

            

        </div>
    );
}

export default ChatItemWrapper;
