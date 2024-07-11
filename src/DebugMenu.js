import React from 'react'

import {db, deleteMessage, sendMessage, sendTimestamp} from './firebase.js';


function DebugMenu({chatroomId}) {




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
                    <input id = "formDate" placeholder="Date" />
                    <input id = "formTime" placeholder="Time" />
                    <button onClick={(e) => (addDate(e))}>Add Date</button>
                </form>
            </div>



            <div className="debugItem">
                <h3 style={{margin:"5px"}}>Recipt</h3>

                <form id = "reciptForm" >
                    <input type="radio" id = "reciptType0" name="reciptType" value = "delivered" />
                    <label >Delivered</label>

                    <input type="radio" id = "reciptType1" name="reciptType" value = "seen"/>
                    <label >Seen</label>

                    <input type="radio" id = "reciptType2" name="reciptType" value = "none" defaultChecked />
                    <label >None</label>
                </form>

            </div>

            <div className="debugItem">
                <h3 style={{margin:"5px"}}>Is Typing?</h3>

                <input type = "checkbox" />
                <label >Show Typing Icon</label>
            </div>
                
        </div>
    )
}

export default DebugMenu;