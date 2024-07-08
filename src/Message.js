import React from 'react';
import './App.css';

import imessageTail from './images/imessageTail.png'
import smsTail from './images/smsTail.png'
import msgTail2 from './images/serverTail.png'


function Message({id, msg, btnStyle, msgStyle, removeFunc, chatroomId}) {

    function showBody() {
        console.log("Removing message" + id)
        removeFunc(chatroomId, id)
    }

    // TODO: Fix this so only the png needs to be swapped out
    let tail = null

    if(msgStyle === "imessageClient") {
        tail = <img src = {imessageTail} alt = "msg_tail_icon" style = {{position:"absolute", width:"10px", right:"6px", bottom:"0px", zIndex:"0"}}></img>

    } else if (msgStyle === "smsClient") {
        tail = <img src = {smsTail} alt = "msg_tail_icon" style = {{position:"absolute", width:"10px", right:"6px", bottom:"0px", zIndex:"0"}}></img>
        
        
    } else if (msgStyle === "gmessageClient") {
        tail = <img src = {imessageTail} alt = "msg_tail_icon" style = {{position:"absolute", width:"10px", right:"6px", bottom:"0px", zIndex:"0"}}></img>


    } else {
        tail = <img src = {msgTail2} alt = "msg_tail_icon" style = {{position:"absolute", width:"20px", left:"2px", bottom:"-3px", zIndex:"0"}}></img>
    }

    return (
        <div  style = {{position:"relative", width:"100%"}}>
            <div className={`chatMsg ${msgStyle}`} >
                {msg}

                <div className='flexRow'>
                    <button className = "HideButton" onClick = {() => (showBody())} style = {{display:`${btnStyle}`, position:"relative"}}>Remove</button>
                    <button className = "HideButton" style = {{display:`${btnStyle}`, position:"relative"}}>Hide</button>
                </div>
                

                
            </div>

            {tail}

        </div>
        

    )
}

export default Message
