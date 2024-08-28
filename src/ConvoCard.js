import imessageBanner from './images/imessageBanner.png'
import smsBanner from './images/smsBanner.png'
import gmessageBanner from './images/gmessageBanner.png'

import { useState } from 'react';
import { deleteConversation } from './firebase.js';

/**
 * A card representing a chatroom. Can be clicked by a user to enter the corresponding chatroom.
 * @param {Array<String, String, Function, String>} props Array containing information about the room, and a function to display the appropriate ChatPane component to the user.
 */
function ConvoCard({chatroomId, chatroomName, enterChatroom, style}) {
    let [isDropped, setIsDropped] = useState(false);    // Boolean that holds if the dropdown is currently active

    // Display the appropriate theme card
    let cardTheme = null;
    switch(style) {
        case "sms":
            cardTheme =  smsBanner;
            break;

        case "imessage":
            cardTheme =  imessageBanner;
            break;

        case "gmessage":
            cardTheme =  gmessageBanner;
            break;

        default:
            cardTheme =  imessageBanner;
            break;
    } 

    /**
     * Deletes the current conversation from Firebase after a positive prompt.
     */
    function deleteCard() {
        if(window.confirm("Are you sure you want to delete this conversation?")){
            deleteConversation(chatroomId)
        }
    }


    return (
        <div style={{position:"relative", width:"250px", height:"fit-content", margin:"10px", boxShadow:"-2px 2px 2px gray", backgroundColor:"gray", borderRadius:"15px"}} >

            <img className= "conversationCard" src={cardTheme} alt='style_banner' style={{margin:"0px", borderTopLeftRadius:"15px", borderTopRightRadius:"15px"}} onClick = {() => {enterChatroom(chatroomId)}}></img>

            <div style={{position:"relative", backgroundColor:"white", padding:"10px", textAlign:"left", borderBottomRightRadius:"15px", borderBottomLeftRadius:"15px"}}>

                <div className='convoDropdown' style = {{float:"right", position:"absolute", right:"4px", top:"0px", display:"inline-block"}}>
                    <button style={{ padding:"2px", backgroundColor:"white", border:"0px", borderRadius:"10px"}} onClick={() => setIsDropped(!isDropped)}>
                        <svg width="22" height="6" viewBox="0 0 22 6" fill="none" >
                            <circle cx="3" cy="3" r="3" fill="black"/>
                            <circle cx="11" cy="3" r="3" fill="black"/>
                            <circle cx="19" cy="3" r="3" fill="black"/>
                        </svg>
                    </button>

                    {/* Some unexpected behavior, find a workaround for detecting clicks globally */}
                    {isDropped && <div className='convoDropdownItems' style={{zIndex:"100"}}>
                        <div>Rename</div>
                        <div>Theme</div>
                        <div onClick={deleteCard} style={{color:"red"}}>Delete</div>
                    </div>}
                </div>
                
                <h3 style={{paddingLeft:"10px", margin:"0px", width:"200px",  textOverflow:"ellipsis", overflow:"hidden", display:"block", whiteSpace:"nowrap"}}>{chatroomName}</h3>
                <h6 style={{paddingLeft:"10px", paddingBottom:"10px", marginBottom:"0px", marginTop:"0px", color:"#777777"}}>15 messages</h6>
                
            </div>

        </div>
    )
}


export default ConvoCard;