import React, {useRef}from 'react';
import './App.css';

import msgTail from './images/msg_tail.png'
import msgTail2 from './images/msg_tail2.png'


function Message({msg, btnStyle, msgStyle}) {
    const bodyRef = useRef(null)

    function showBody() {
        console.log(bodyRef.current.style.display)
        bodyRef.current.style.display = "none"

        //Fix this to somehow remove the objects from the actual html
    }

    let tail = null

    if(msgStyle === "clientMsg") {
        tail = <img src = {msgTail} style = {{position:"absolute", width:"20px", right:"5px", bottom:"-1px", zIndex:"0"}}></img>

    } else {
        tail = <img src = {msgTail2} style = {{position:"absolute", width:"20px", left:"4px", bottom:"-2px", zIndex:"0"}}></img>
    }

    return (
        <div style = {{position:"relative", width:"100%"}}>
            <div ref ={bodyRef} className={`chatMsg ${msgStyle}`} >
                {msg}
                <button className = "HideButton" onClick = {() => (showBody())} style = {{display:`${btnStyle}`, position:"relative"}}>X</button>
                
            </div>

            {tail}

        </div>
        

    )
}

export default Message