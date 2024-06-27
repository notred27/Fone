import React, {useRef, useState} from 'react'
import micImg from './images/mic.png'
import uploadImg from './images/upload.png'
import './app.css'

function Keyboard({createMessage}) {
    const textRef = useRef(null);
    const [sendImg, setSendImg] = useState(micImg)

    function sendMessage() {
        if(textRef.current.value !== "") {
            createMessage(textRef.current.value);
            textRef.current.value = ""
            setSendImg(micImg);
        }
    }

    function changeSendIcon() {
        if(textRef.current.value === "" && sendImg === uploadImg){
            setSendImg(micImg);
        } else if (textRef.current.value !== "" && sendImg === micImg) {
            setSendImg(uploadImg);
        }
    }

    return (
        <div className='keyboard' style = {{position:"sticky", bottom:"0px", backgroundColor:"white"}}>
            <div style ={{display:"flex", flexDirection:"row"}}>
                <button style={{border:"0px", borderRadius:"40%", margin:"8px", color:"#888888", paddingLeft:"6px", paddingRight:"6px", fontWeight:"bold"}} >+</button>
                <input className='messageInput' ref = {textRef} onChange={changeSendIcon} placeholder='Message' ></input>
                <img src = {sendImg} alt ="submit" onClick={sendMessage} style = {{height:"20px", position:"absolute", marginLeft:"90%", marginTop:"8px"}}></img>
                
            </div>

        </div>
    );
}

export default Keyboard;