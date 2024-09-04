import iPhoneConvoImage from '../../assets/imessageConvo.png'
import smsConvoImage from '../../assets/smsConvo.png'
import androidConvoImage from '../../assets/gmessageConvo.png'
import whatsappConvoImage from '../../assets/whatsappConvo.png'


import React, {useState, useEffect} from 'react'
import {createConversation, getNumConversations} from '../../firebase.js';
import PopupWrapper from '../../PopupWrapper.js'


/**
 * Popup menu that is used to create a new chatroom.
 * @param {Array<Function>} props Array containing function to dismiss this popup. 
 */
function AddChatroom() {
    const [theme, setTheme] = useState(iPhoneConvoImage);  // Holds the currently selected theme image of the new chatroom
    const [numRooms, setNumRooms] = useState("");          // Holds the current number of accessible conversations
    const [chatroomPopupShowing, setChatroomPopupShowing] = useState(false);

    
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
        setChatroomPopupShowing(false); 
    }


    return (
        <div >
            <div className='conversationCard' style = {{display:"flex", justifyContent:"center", alignItems:"center", width:"250px", maxWidth:"45vw", height:"215px", margin:"10px", backgroundColor:"white", borderRadius:"20px", boxShadow:"-2px 2px 2px gray"}} onClick = {() => (setChatroomPopupShowing(true))}>
                <h3>Create New<br/>Conversation!</h3>
            </div>

            {chatroomPopupShowing && <PopupWrapper>
                <form className="popupBg" id = "chatroomPopup" style={{padding:"25px"}} onSubmit={(e) => (createRoom(e))}  >
                    
                    <div className = "flexRow" style = {{ flexWrap:"wrap", alignContent:"center", justifyContent:"center", padding:"10px"}}>

                        <div style = {{textAlign:"center", position:"relative", width:"fit-content", padding:"10px"}}>

                            <h3 className='menuHeader'>Theme</h3>

                            <div className='flexRow'>
                                <img src = {theme} alt = "chatroomTheme" style = {{width:"40%"}}/>


                                <span style = {{textAlign:"left"}}>
                                    <input id = "imessageRadio" type="radio" name="conversationTheme" value = "imessage" defaultChecked onClick ={() => (setTheme(iPhoneConvoImage))} />
                                    <label for ="imessageRadio">iMessage</label>

                                    <br/>

                                    <input id = "smsRadio" type="radio" name="conversationTheme" value = "sms" onClick ={() => (setTheme(smsConvoImage))}/>
                                    <label for ="smsRadio">SMS</label>

                                    <br/>

                                    <input id = "gmessageRadio" type="radio" name="conversationTheme" value = "gmessage" onClick ={() => (setTheme(androidConvoImage))}/>
                                    <label for ="gmessageRadio">G-Messages</label>

                                    <br/>

                                    <input id = "whatsappRadio" type="radio" name="conversationTheme" value = "whatsapp" onClick ={() => (setTheme(whatsappConvoImage))}/>
                                    <label for ="whatsappRadio">Whats App</label>
                                </span>

                            </div>
                        </div>
                    
                        <div style = {{padding:"10px", textAlign:"center"}}>
                            <h3 className='menuHeader'>Chatroom Name</h3>
                            <input id = "roomNameInput" className='menuInput' placeholder={`Room ${numRooms}`}/>

                            <br/>
                            <br/>

                            <h3 className='menuHeader'>Display Name</h3>
                            <input id = "displayNameInput" className='menuInput' placeholder="Username" />

                            <br/>
                            <br/>
                        </div>

                    </div>
                    <button className='menuBack' style ={{position:"absolute", right:"10px", top:"10px"}} onClick={() =>(setChatroomPopupShowing(false))}>Back</button>
                    <button className="centered menuAccept" type = "submit"  > Create Chatroom! </button>
                    
                </form>
            </PopupWrapper>}
            
        </div>)
}


export default AddChatroom;