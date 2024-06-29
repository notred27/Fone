import React, {useRef, useState} from 'react'
import micImg from './images/mic.png'
import uploadImg from './images/upload.png'
import './App.css';

import {auth, db} from './firebase.js';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';

function Keyboard({createMessage}) {
    const inputRef = useRef("");
    const [sendImg, setSendImg] = useState(micImg)
    const [message, setMessage] = useState("");


    // Move and alter this method to store messages in a Firebase Doc
    const sendMessage = async (event) => {

        event.preventDefault();
        
        if(inputRef.current.value !== "") {
            createMessage(inputRef.current.value);
            setSendImg(micImg);
        }

        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
            text: inputRef.current.value,
            type: "clientMsg",
            name: displayName,
            avatar: photoURL,
            createdAt: serverTimestamp(),
            uid,
            });
        inputRef.current.value = "";


    }

    function changeSendIcon(msg) {
        setMessage(inputRef.current.value);
        if(msg === "" && sendImg === uploadImg){
            setSendImg(micImg);
        } else if (msg !== "" && sendImg === micImg) {
            setSendImg(uploadImg);
        }
    }

    return (
        <div className='keyboard' style = {{position:"sticky", bottom:"0px", backgroundColor:"white"}}>
            <form style ={{display:"flex", flexDirection:"row"}} >
                
                <button style={{border:"0px", borderRadius:"40%", margin:"8px", color:"#888888", paddingLeft:"6px", paddingRight:"6px", fontWeight:"bold"}} >+</button>
                <input className='messageInput' ref = {inputRef} onChange={(e) => (changeSendIcon(e.target.value))} placeholder='Message' ></input>
                <img type = "submit" src = {sendImg} alt ="submit" onClick={(event) => sendMessage(event)} style = {{height:"20px", position:"absolute", marginLeft:"90%", marginTop:"8px"}}></img>
                
            </form>

        </div>
    );
}

export default Keyboard;