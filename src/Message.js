import React, {useRef}from 'react';
import './app.css';
import msgTail from './images/msg_tail.png'

function Message({msg, btnStyle, msgStyle}) {
    const bodyRef = useRef(null)

    function showBody() {
        console.log(bodyRef.current.style.display)
        bodyRef.current.style.display = "none"

        //Fix this to somehow remove the objects from the actual html
    }


    return (
        // <div style = {{position:"relative", width:"100%"}}>
            <div ref ={bodyRef} className={`chatMsg ${msgStyle}`} >
                {msg}
                <button className = "HideButton" onClick = {() => (showBody())} style = {{display:`${btnStyle}`, position:"relative"}}>X</button>
                
            </div>

            // {/* <img src = {msgTail} style = {{position:"absolute", right:"1px", bottom:"-5px", zIndex:"0"}}></img> */}

        // </div>
        

    )
}

export default Message