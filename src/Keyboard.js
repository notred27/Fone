import React, {useRef, useState} from 'react'
import micImg from './images/mic.png'
import uploadImg from './images/upload.png'
import './App.css';

import add_btn from './images/add_img.png'
import {fileUpload} from './firebase.js'

function Keyboard({createMessage, chatroomId}) {
    const inputRef = useRef("");
    const fileSelectRef = useRef("")
    const [sendImg, setSendImg] = useState(micImg)



    const sendMessage = async (event) => {
        
        event.preventDefault();
        
        if(inputRef.current.value !== "") {
            createMessage(chatroomId, inputRef.current.value, "clientMsg");
            setSendImg(micImg);
            inputRef.current.value = "";
        }
    }

    // Changes the microphone icon to the upload icon when text is present in the input bar
    function changeSendIcon(msg) {
        if(msg === "" && sendImg === uploadImg){
            setSendImg(micImg);
        } else if (msg !== "" && sendImg === micImg) {
            setSendImg(uploadImg);
        }
    }

    function uploadImage(event) {
        event.preventDefault();

        const file = document.getElementById('keyboard_img_upload').files;
        if(file.length >= 1) {
            fileUpload(chatroomId, "sentImage", file[0])

        }


    }

    return (
        <div className='keyboard' style = {{position:"relative", bottom:"0px", backgroundColor:"white"}}>
            <form style ={{display:"flex", flexDirection:"row", justifyContent:"center"}} onSubmit={(e) => {e.preventDefault(); sendMessage(e)}}>
                
                <div>
                    <img src ={add_btn} style={{height:"1.8em", marginRight:"10px"}} onClick={() => (fileSelectRef.current.click())}></img>
                    {/* Workaround for styling the file select button */}
                    <input id = "keyboard_img_upload" type="file" ref = {fileSelectRef} style={{display:"none"}} onChange={(e) => (uploadImage(e))}/>

                </div>
                
                
                
                <div style ={{position:"relative", width:"80%"}}>
                    <input className='messageInput' ref = {inputRef} onChange={(e) => (changeSendIcon(e.target.value))} placeholder='Message' ></input>
                    <img type = "submit" src = {sendImg} alt ="submit" onClick={(event) => sendMessage(event)} style = {{height:"20px", position:"absolute", right:"2px", top:"6px"}}></img>
                    
                </div>
                
            </form>

        </div>
    );
}

export default Keyboard;