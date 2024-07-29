import React, {useRef} from 'react';
import './App.css';

import imessageTail from './images/imessageTail.png'
import smsTail from './images/smsTail.png'
import msgTail2 from './images/serverTail.png'


function Message({id, msg, btnStyle, msgStyle, removeFunc, chatroomId, tailShown = false}) {
    const messageRef = useRef(null)

    function showBody() {
        removeFunc(chatroomId, id);
    }

    function hideMessage() {
        if(messageRef.current.style.opacity == "" || messageRef.current.style.opacity == "1") {
            messageRef.current.style.opacity = "0.3"
            // messageRef.current.className = "HideButton"

        } else {
            messageRef.current.style.opacity = "1"
            // messageRef.current.className = ""


        }
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
        <div ref = {messageRef} style = {{position:"relative", width:"100%", marginBottom:`${tailShown ? "10px" : "0px"}`}}>
            <div className={`chatMsg ${msgStyle}`} >
                {msg}

                <div className='flexRow'>
                    <button className = "HideButton" onClick = {() => (showBody())} style = {{display:`${btnStyle}`, position:"relative"}}>Remove</button>
                    <button className = "HideButton" onClick = {hideMessage} style = {{display:`${btnStyle}`, position:"relative"}}>Hide</button>
                </div>
                                
            </div>

            {tailShown && tail}

        </div>
    );
}

export default Message;
