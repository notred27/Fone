import imessageBanner from '../../assets/imessageBanner.png'
import smsBanner from '../../assets/smsBanner.png'
import gmessageBanner from '../../assets/gmessageBanner.png'
import whatsappBanner from '../../assets/whatsappBanner.png'


import { useState } from 'react';
import { deleteConversation, setChatroomName, setChatroomTheme } from '../../firebase.js';
import PopupWrapper from '../../PopupWrapper.js';
import { CHATROOM_THEMES } from '../../index.js'; 
import { Link } from 'react-router-dom';


/**
 * A card representing a chatroom. Can be clicked by a user to enter the corresponding chatroom.
 * @param {Array<String, String, Function, String>} props Array containing information about the room, and a function to display the appropriate ChatPane component to the user.
 */
function ConvoCard({chatroomId, chatroomName, enterChatroom, style}) {
    let [isDropped, setIsDropped] = useState(false);    // Boolean that holds if the dropdown is currently active
    let [changingTheme, setChangingTheme] = useState(false);
    let [changingName, setChangingName] = useState(false);


    // Display the appropriate theme card
    let cardTheme = null;
    switch(style) {
        case CHATROOM_THEMES.sms:
            cardTheme =  smsBanner;
            break;

        case CHATROOM_THEMES.imessage:
            cardTheme =  imessageBanner;
            break;

        case CHATROOM_THEMES.gmessage:
            cardTheme =  gmessageBanner;
            break;

        case CHATROOM_THEMES.whatsapp:
            cardTheme =  whatsappBanner;
            break;
    

        default:
            cardTheme =  imessageBanner;
            break;
    } 

    /**
     * Deletes the current conversation from Firebase after a confirmation prompt.
     */
    function deleteCard() {
        if(window.confirm("Are you sure you want to delete this conversation?")){
            deleteConversation(chatroomId)
        }
    }


    return (
        <div style={{position:"relative", width:"250px", maxWidth:"45vw", height:"fit-content", margin:"10px", boxShadow:"-2px 2px 2px gray", backgroundColor:"white", borderRadius:"15px"}} >

            <Link to={`/chatroom/${chatroomId}`}>
                <img className= "conversationCard" src={cardTheme} alt='style_banner' style={{margin:"0px", borderTopLeftRadius:"15px", borderTopRightRadius:"15px", width:"100%"}} ></img>
            </Link>

            <div style={{position:"relative", backgroundColor:"white", padding:"12px", textAlign:"left", borderBottomRightRadius:"15px", borderBottomLeftRadius:"15px"}}>

                <div className='convoDropdown' style = {{float:"right", position:"absolute", right:"4px", top:"-6px", display:"inline-block"}}>
                    <button style={{ padding:"2px", backgroundColor:"white", border:"0px", borderRadius:"10px"}} onClick={() => setIsDropped(!isDropped)}>
                        <svg width="22" height="6" viewBox="0 0 22 6" fill="none" >
                            <circle cx="3" cy="3" r="3" fill="black"/>
                            <circle cx="11" cy="3" r="3" fill="black"/>
                            <circle cx="19" cy="3" r="3" fill="black"/>
                        </svg>
                    </button>

                    {/* Some unexpected behavior, find a workaround for detecting clicks globally */}
                    {isDropped && <div className='convoDropdownItems' style={{zIndex:"100", border:"solid #ececec 1px", borderRadius:"5px"}}>
                        <div onClick={() => (setChangingName(true))}>Rename</div>
                        <div onClick={() => (setChangingTheme(imessageBanner))}>Theme</div>
                        <div onClick={deleteCard} style={{color:"red"}}>Delete</div>
                    </div>}
                </div>
                
                <h3 style={{paddingLeft:"10px", margin:"0px", width:"200px",  textOverflow:"ellipsis", overflow:"hidden", display:"block", whiteSpace:"nowrap"}}>{chatroomName}</h3>
                <h6 style={{paddingLeft:"10px", paddingBottom:"10px", marginBottom:"0px", marginTop:"0px", color:"#777777"}}>15 messages</h6>
                
                
            </div>


            {/* Popup menu for changing a chatrooms theme */}
            {changingTheme !== false &&
                <PopupWrapper>

                    <div className="popupBg">
                        <h3 className='menuHeader' >Select Chatroom Theme</h3>

                        <img src={changingTheme} alt='style_banner' style={{margin:"0px"}} />

                        <form id = "theme_change_form" autoComplete='off' onSubmit={(e) => {e.preventDefault();}}>
                            <input type="radio" id = "theme0" name="themeType" value = {CHATROOM_THEMES.imessage} onClick={() => (setChangingTheme(imessageBanner))} defaultChecked />
                            <label for = "theme0">imessage</label>

                            <br/>

                            <input type="radio" id = "theme1" name="themeType" value = {CHATROOM_THEMES.sms} onClick={() => (setChangingTheme(smsBanner))} />
                            <label for = "theme1">SMS</label>

                            <br/>

                            <input type="radio" id = "theme2" name="themeType" value = {CHATROOM_THEMES.gmessage} onClick={() => (setChangingTheme(gmessageBanner))} />
                            <label for = "theme2">Google Messages</label>

                            <br/>

                            <input type="radio" id = "theme3" name="themeType" value = {CHATROOM_THEMES.whatsapp} onClick={() => (setChangingTheme(whatsappBanner))} />
                            <label for = "theme3">Whats App</label>

                            <br/>
                            <br/>

                            <span className='flexRow' style={{justifyContent: "center", alignItems: "center"}} >
                      
                                <button className='menuAccept' style={{marginRight:"20%"}} onClick={() => {
                                    
                                    if(style !== document.getElementById('theme_change_form').elements['themeType'].value){
                                        setChatroomTheme(chatroomId, document.getElementById('theme_change_form').elements['themeType'].value)
                                    }


                                    setChangingTheme(false);
                                    setIsDropped(false)
                                    
                                    }}>Accept</button>


                                <button className='menuBack'  onClick={() => {setChangingTheme(false); setIsDropped(false)}}>Back</button>
                            </span>
                        </form>


                        
                    </div>
                </PopupWrapper>
            }


            {/* Popup menu for changing a chatrooms name */}
            {changingName &&
                <PopupWrapper>

                    <div className="popupBg">

                        
                        <h3 className='menuHeader' >Current Name</h3>
                        <h4 style={{margin:"0px"}}>{chatroomName}</h4>

                        <br/>
                        <h3   className='menuHeader' >New Name</h3>
                        <input id = "name_change_input" className='menuInput'/>

                        <br/>
                        <br/>

                        <span className='flexRow' style={{justifyContent: "center", alignItems: "center"}} >

                            <button className='menuAccept' style={{marginRight:"20%"}} onClick={() => {
                                if(document.getElementById("name_change_input").value !== "") {
                                    setChatroomName(chatroomId, document.getElementById("name_change_input").value);
                                }
                                setChangingName(false);
                                setIsDropped(false);
                                
                                }}>Accept</button>


                            <button className='menuBack' onClick={() => {setChangingName(false); setIsDropped(false)}}>Back</button>

                            <br/>
                        </span>

                        
                    </div>
                </PopupWrapper>
            }
        </div>
    )
}


export default ConvoCard;