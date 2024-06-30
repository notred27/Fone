import React from 'react';
import './App.css';

import msgTail from './images/msg_tail.png'
import msgTail2 from './images/msg_tail2.png'


function Message({id, msg, btnStyle, msgStyle, removeFunc}) {

    function showBody() {
        console.log("Removing message" + id)
        removeFunc(id)
    }

    // TODO: Fix this so only the png needs to be swapped out
    let tail = null

    if(msgStyle === "clientMsg") {
        tail = <img src = {msgTail} alt = "msg_tail_icon" style = {{position:"absolute", width:"20px", right:"5px", bottom:"-1px", zIndex:"0"}}></img>

    } else {
        tail = <img src = {msgTail2} alt = "msg_tail_icon" style = {{position:"absolute", width:"20px", left:"4px", bottom:"-2px", zIndex:"0"}}></img>
    }

    return (
        <div  style = {{position:"relative", width:"100%"}}>
            <div className={`chatMsg ${msgStyle}`} >
                {msg}
                <button className = "HideButton" onClick = {() => (showBody())} style = {{display:`${btnStyle}`, position:"relative"}}>X</button>
                
            </div>

            {tail}

        </div>
        

    )
}

export default Message
