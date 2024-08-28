import iPhoneConvoImage from './images/imessageConvo.png'
import smsConvoImage from './images/smsConvo.png'
import androidConvoImage from './images/gmessageConvo.png'

import React, {useState, useEffect} from 'react'
import {createConversation, getNumConversations} from './firebase.js';


/**
 * Popup menu that is used to create a new chatroom.
 * @param {Array<Function>} props Array containing function to dismiss this popup. 
 */
function ChatroomMenu({hidePopup}) {
    const [theme, setTheme] = useState(iPhoneConvoImage);  // Holds the currently selected theme image of the new chatroom
    const [numRooms, setNumRooms] = useState("");          // Holds the current number of accessible conversations


    // Get the current number of accessible conversations
    useEffect(() => {
        async function getNum() {
            const num = await getNumConversations();
            setNumRooms(parseInt(num) + 1);
        }
        getNum()
    }, [])


    /**
     * Generate a new chatroom based on the information in the 'chatroomPopup' form.
     * @param {FormEvent} e React HTML form event.
     */
    function createRoom(e) {
        e.preventDefault(); // Prevent this page from refreshing when the form is submitted
        
        // Get the information about the new chatroom from the 'chatroomPopup' form
        const roomTheme = document.getElementById('chatroomPopup').elements['conversationTheme'].value;
        const displayName = document.getElementById('chatroomPopup').elements['displayNameInput'].value;
        let roomName = document.getElementById('chatroomPopup').elements['roomNameInput'].value;

        if(roomName === "") {   //If no room name is specified, set the name to the current number of rooms
            roomName = `Room ${numRooms}`;
        }

        // After creating the chatroom in firebase, hide this popup
        createConversation(roomName, displayName, roomTheme);
        hidePopup(false); 
    }


    return (
        <div >
            <div style = {{backgroundColor:"rgba(0,0,0,0.2)", width:"100vw", height:"100vh", position:"fixed", zIndex:"200"}}/>

            <form id = "chatroomPopup" onSubmit={(e) => (createRoom(e))}  style={{position:"absolute", top:"20vh", left:"calc(50vw - 40vmin)", width:"80vmin", height:"auto", zIndex:"999", backgroundColor:"#ececec", borderRadius:"20px", border:"6px solid #888888"}}>
                
                <div className = "flexRow" style = {{ flexWrap:"wrap", alignContent:"center", justifyContent:"center", padding:"10px"}}>

                    <div style = {{textAlign:"center", position:"relative", width:"150px", padding:"10px"}}>

                        <h3>Theme</h3>
                        <img src = {theme} alt = "chatroomTheme" style = {{width:"70%"}}/>


                        <div style = {{textAlign:"left"}}>
                            <input id = "imessageRadio" type="radio" name="conversationTheme" value = "imessage" defaultChecked onClick ={() => (setTheme(iPhoneConvoImage))} />
                            <label for ="imessageRadio">iMessage</label>

                            <br/>

                            <input id = "smsRadio" type="radio" name="conversationTheme" value = "sms" onClick ={() => (setTheme(smsConvoImage))}/>
                            <label for ="smsRadio">SMS</label>

                            <br/>

                            <input id = "gmessageRadio" type="radio" name="conversationTheme" value = "gmessage" onClick ={() => (setTheme(androidConvoImage))}/>
                            <label for ="gmessageRadio">G-Messages</label>
                        </div>


                    </div>
                


                    <div style = {{padding:"10px"}}>
                        <h3 style={{marginBottom:"0px"}}>Chatroom Name:</h3>
                        <br/>
                        <input id = "roomNameInput" placeholder={`Room ${numRooms}`}/>

                        <br/>

                        <h3 style={{marginBottom:"0px"}}>Display Name:</h3>
                        <br/>
                        <input id = "displayNameInput" placeholder="Username" />

                        <br/>

                        <button type = "submit" style={{fontSize:"1.5em", backgroundColor:"#5c85ff", color:"white", border:"5px solid white", borderRadius:"20px", padding:"5px", marginTop:"20px"}} > Create Chatroom! </button>

                        <br/>
                       
                    </div>

                    <button style ={{position:"absolute", right:"10px", color:"white", backgroundColor:"#5c85ff", borderRadius:"20px", padding:"5px", border:"0px"}} onClick={() =>(hidePopup(false))}>Back</button>

                </div>
                
            </form>
        </div>)
}


export default ChatroomMenu;