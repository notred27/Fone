import React, {useRef} from 'react'
import {sendMessage, sendTimestamp, setMessageFlair, fileUpload, setTypingStatus} from '../../firebase.js';


function DebugMenu({chatroomId, setDeliveredMsg}) {
    const imageSubmit = useRef(null);   // Stores the currently selected file from the "imageForm" form


    /**
     * Submit the completed "messageForm" and create the corresponding message object in Firestore.
     * @param {FormEvent} event React HTML form event.
     */
    function addMessage(event) {
        event.preventDefault(); // Prevent form submission from refreshing page

        const messageType = document.getElementById('messageForm').elements['addType'].value;
        const message = document.getElementById('messageForm').elements['messageContent'].value;

        if (message !== "") {   // Upload a message if it is not empty, and reset value after upload
            sendMessage(chatroomId, message, messageType);
            document.getElementById('messageForm').elements['messageContent'].value = "";
        }
    }


    /**
     * Submit the completed "timestampForm" and create the corresponding DateHeader object in Firestore.
     * @param {FormEvent} event React HTML form event.
     */
    function addDate(event) {
        event.preventDefault(); // Prevent form submission from refreshing page

        const date = document.getElementById('timestampForm').elements['formDate'].value;
        const time = document.getElementById('timestampForm').elements['formTime'].value;

        sendTimestamp(chatroomId, date, time)
    }


    /**
     * Submit the value of "typingCheckbox" and to update the "isTyping" chatroom field in Firestore.
     */
    // TODO: Finish implementing this in other components, along with the autodetect option
    function setTyping() {
        const val = document.getElementById('typingCheckbox').checked;
        setTypingStatus(chatroomId, val)
    }


    /**
     * Submit the completed "imageForm" and create the corresponding file objects in Firestore and Firebase Storage.
     * @param {FormEvent} event React HTML form event.
     */
    function sendImageToServer(event) {
        event.preventDefault(); // Prevent form submission from refreshing page

        const imageType = document.getElementById('imageForm').elements['addImg'].value;
        const file = document.getElementById('imageForm').elements['imageUpload'].files[0];

        // Upload the file to a storage server, and upload a pointer to firestore
        fileUpload(chatroomId, imageType, file)
    }


    return (
        <div style = {{position:"sticky", bottom:"0px", padding:"10px", backgroundColor:"#ECECEC"}}>

            <div className="debugItem">
                <h3 style={{margin:"5px"}}>Message</h3>

                <form id = "messageForm" autoComplete='off' onSubmit={(e) => {e.preventDefault(); addMessage(e);}}>
                    <input type="radio" id = "addType0" name="addType" value = "clientMsg" defaultChecked/>
                    <label >Sent Msg (Right)</label>

                    <br/>

                    <input type="radio" id = "addType1" name="addType" value = "serverMsg"/>
                    <label >Received Msg (Left)</label>

                    <br/>

                    <input id ="messageContent" placeholder="Message" />
                    <button onClick={(e) => (addMessage(e))}>Add message</button>

                </form>

            </div>


            <div className="debugItem">
                <h3 style={{margin:"5px"}}>Timestamp</h3>

                <form id = "timestampForm">
                    <input id = "formDate" placeholder="Date" style = {{ width:"8em"}} />
                    <input id = "formTime" placeholder="Time" style = {{ width:"8em"}} />
                    <button onClick={(e) => (addDate(e))}>Add Date</button>
                </form>
            </div>


            <div className="debugItem">
                <h3 style={{margin:"5px"}}>Recipt</h3>

                <form id = "reciptForm" >
                    <input type="radio" id = "reciptType1" name="reciptType" value = "seen" onClick={() => {setDeliveredMsg("Seen"); setMessageFlair(chatroomId, "Seen")}} />
                    <label >Seen</label>

                    <br/>

                    <input type="radio" id = "reciptType0" name="reciptType" value = "delivered" onClick={() => {setDeliveredMsg("Delivered"); setMessageFlair(chatroomId, "Delivered")}}/>
                    <label >Delivered</label>

                    <br/>

                    <input type="radio" id = "reciptType2" name="reciptType" value = "none" defaultChecked onClick={() => {setDeliveredMsg("Seen"); setMessageFlair(chatroomId, "")}} />
                    <label >None</label>
                </form>

            </div>

            <div className="debugItem">
                <h3 style={{margin:"5px"}}>Is Typing?</h3>

                <input type = "checkbox" id = "typingCheckbox"  onClick={setTyping}/>
                <label >Show Typing Icon</label>

                <br/>
                <input type = "checkbox" />
                <label >Auto-detect</label>
            </div>
                

            <div className="debugItem">
                <h3 style={{margin:"5px"}}>Add Image</h3>


                <form id = "imageForm"> 

                    <input id = "imageUpload" ref = {imageSubmit} type='file' accept = "image/*" />

                    <br/>

                    <input type="radio" id = "addImg0" name="addImg" value = "sentImage" defaultChecked/>
                    <label >Sent Image</label>

                    <input type="radio" id = "addImg1" name="addImg" value = "recievedImage"/>
                    <label >Received Image</label>

                    <br/>

                    <button onClick={(e) => (sendImageToServer(e))}>Submit</button>
                </form>


            </div>

        </div>
    )
}

export default DebugMenu;