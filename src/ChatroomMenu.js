import React, {useState, useEffect} from 'react'
import iPhoneConvoImage from './images/imessageConvo.png'
import smsConvoImage from './images/smsConvo.png'
import androidConvoImage from './images/gmessageConvo.png'
import {createConversation} from './firebase.js';


import { getNumConversations } from './firebase'

function ChatroomMenu({hidePopup}) {

    const [theme, setTheme] = useState(iPhoneConvoImage)
    const [numRooms, setNumRooms] = useState("")


    useEffect(() => {
        async function getNum() {
            const num = await getNumConversations();
            setNumRooms(parseInt(num) + 1);

        }

        getNum()
    }, [])




    function createRoom(e) {
        e.preventDefault();
        
        const roomTheme = document.getElementById('chatroomPopup').elements['conversationTheme'].value;
        let roomName = document.getElementById('chatroomPopup').elements['roomNameInput'].value;

        if(roomName === "") {
            roomName = `Room ${numRooms}`;
        }
        const displayName = document.getElementById('chatroomPopup').elements['displayNameInput'].value;

        createConversation(roomName, displayName, roomTheme)
    
        hidePopup(false)
    }

    return (
        <div >
            <div style = {{backgroundColor:"rgba(0,0,0,0.2)", width:"100vw", height:"100vh", position:"fixed", zIndex:"200"}}>

            </div>
        
            <form id = "chatroomPopup" onSubmit={(e) => (createRoom(e))} className = "flexRow" style={{position:"absolute", top:"20vh", left:"calc(50vw - 40vmin)", width:"80vmin", height:"auto", zIndex:"999", backgroundColor:"#ececec", borderRadius:"20px", border:"6px solid #888888"}}>
                

                <div style = {{textAlign:"center", position:"relative", width:"150px", padding:"10px"}}>

                    <h3>Theme</h3>
                    <img src = {theme} alt = "chatroomTheme" />


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
                


                <div>
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
                    <button onClick={() =>(hidePopup(false))}>Cancel</button>

                </div>


                
            </form>
        </div>


    )
}


export default ChatroomMenu;