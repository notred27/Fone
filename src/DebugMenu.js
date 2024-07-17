import React, {useRef} from 'react'

import {sendMessage, sendTimestamp, setMessageFlair, fileUpload} from './firebase.js';


function DebugMenu({chatroomId, setDeliveredMsg}) {


    const imageSubmit = useRef(null);

    function addMessage(event) {
        event.preventDefault();

        const messageType = document.getElementById('messageForm').elements['addType'].value;
        const message = document.getElementById('messageForm').elements['messageContent'].value;

        if (message !== "") {
            sendMessage(chatroomId, message, messageType);
            document.getElementById('messageForm').elements['messageContent'].value = "";
        }
    }


    function addDate(event) {
        event.preventDefault();

        const date = document.getElementById('timestampForm').elements['formDate'].value;
        const time = document.getElementById('timestampForm').elements['formTime'].value;

        sendTimestamp(chatroomId, date, time)
    }


    function sendImageToServer(event) {
        event.preventDefault();

        const imageType = document.getElementById('imageForm').elements['addImg'].value;
        const file = document.getElementById('imageForm').elements['imageUpload'].files[0];

        // Upload the file to a storage server, and upload a pointer to firestore
        fileUpload(chatroomId, imageType, file)

    }

    return (
        <div style = {{position:"sticky", bottom:"0px", padding:"10px", backgroundColor:"#ECECEC"}}>

            <div className="debugItem">
                <h3 style={{margin:"5px"}}>Message</h3>

                <form id = "messageForm" >
                    <input type="radio" id = "addType0" name="addType" value = "clientMsg" defaultChecked/>
                    <label >Sent Msg</label>

                    <input type="radio" id = "addType1" name="addType" value = "serverMsg"/>
                    <label >Received Msg</label>

                    <br/>

                    <input id ="messageContent" placeholder="Message" />
                    <button onClick={(e) => (addMessage(e))}>Add message</button>

                </form>

                {/* <button onClick={(event) => (sendDebugMessage(event, inputTextRef.current.value, inputRadioRef.current.elements["addType"].value))}>Add message</button> */}
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

                <input type = "checkbox" />
                <label >Show Typing Icon</label>
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