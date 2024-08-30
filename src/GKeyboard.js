import micImg from './images/gmMic.png'
import uploadImg from './images/gcUpload.png'
import add_btn from './images/gmAddImg.png'

import React, {useRef, useState} from 'react'
import {fileUpload, sendMessage} from './firebase.js'


function GKeyboard({chatroomId}) {
    const inputRef = useRef("");                    // TODO: Change this to document.getElementById?
    const fileSelectRef = useRef("");               // HACK: Holds a reference to the file input so it can remain hidden but used
    const [sendImg, setSendImg] = useState(micImg); // Holds the current image for the submit button


    /**
     * Upload the message in "keyboard_input" to Firestore.
     * @param {FormEvent} event React HTML form event.
     */
    function sendMessageToFirebase(event) {
        event.preventDefault(); // Prevent page from refreshing on form submission
        
        if(inputRef.current.value !== "") { // Upload the message if one exists, and reset the input's value
            sendMessage(chatroomId, inputRef.current.value, "clientMsg");
            inputRef.current.value = "";
            setSendImg(micImg); // Reset the upload icon to the microphone icon
        }
    }


    /**
     * Changes the submit button icon if msg is not empty.
     * @param {String} msg The current message in "keyboard_input".
     */
    function changeSendIcon(msg) {
        if(msg === "" && sendImg === uploadImg){
            setSendImg(micImg);
        } else if (msg !== "" && sendImg === micImg) {
            setSendImg(uploadImg);
        }
    }


    /**
     * Upload the selected image from "keyboard_img_upload" to Firestore and Firebase Storage.
     * @param {FormEvent} event React HTML form event.
     */
    function uploadImage(event) {
        event.preventDefault(); // Prevent page from refreshing on form submission

        const file = document.getElementById('keyboard_img_upload').files;
        if(file.length >= 1) {  // Upload the image file (if it exists)
            fileUpload(chatroomId, "sentImage", file[0])
        }
    }

    return (
        <div style = {{position:"relative", bottom:"0px", backgroundColor:"#10131a", paddingTop:"5px", paddingBottom:"5px"}}>
            <form style ={{display:"flex", flexDirection:"row"}} onSubmit={(e) => {sendMessageToFirebase(e)}}>
                <div style ={{position:"relative", width:"80%"}}>
                    <input id = 'keyboard_input' className='gmessageInput' ref = {inputRef} onChange={(e) => (changeSendIcon(e.target.value))} placeholder='Text message' ></input>
                    
                    <span style = {{position:"absolute", right:"-18px", borderRadius:"20px", top:"0.5em"}}>
                        <img src ={add_btn} alt = "add_image_icon" style={{height:"1.2em"}} onClick={() => (fileSelectRef.current.click())}></img>
                        {/* Workaround for styling the file select button */}
                        <input id = "keyboard_img_upload" type="file" accept = "image/*" ref = {fileSelectRef} style={{display:"none"}} onChange={(e) => (uploadImage(e))}/>

                    </span>
                </div>
                
                
                
                <img type = "submit" src = {sendImg} alt ="submit" onClick={(event) => sendMessageToFirebase(event)} style = {{height:"calc(1em + 20px)", position:"absolute", right:"5px"}}></img>

                
            </form>
        </div>
    );
}

export default GKeyboard;