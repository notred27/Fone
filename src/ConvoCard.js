import { deleteConversation} from './firebase.js';

import iPhoneConvoImage from './images/imessageConvo.png'
import smsConvoImage from './images/smsConvo.png'
import androidConvoImage from './images/gmessageConvo.png'
import kebab from './images/kebab.svg'

function ConvoCard({chatroomId, chatroomName, enterChatroom, style}) {
    
    let cardTheme = iPhoneConvoImage;
    if (style === "sms") {
        cardTheme = smsConvoImage;
    } else if (style === "gmessage") {
        cardTheme = androidConvoImage;
    }

    return (
    <div style={{position:"relative"}}>
        <img src = {cardTheme}  alt = "convoCardImg" className='convoCard' onClick = {() => {enterChatroom(chatroomId)}}></img>
        <h5 style = {{margin:"0px", padding:"0px"}}>{chatroomName}</h5>
        
        

        {/* TODO: Make a toggle for delete mode */}
        {/* <button onClick={() => {
                if(window.confirm("Are you sure you want to delete this conversation?")){
                    deleteConversation(chatroomId)

                }
            }}
            style = {{position:"absolute", top:"0", right:"0", backgroundColor:"#ececec", color:"#444444", border:"4px solid #444444", fontWeight:"bold", borderRadius:"50px"}}>x</button>
     */}
        <button className = "kebab-btn" onClick={() => {
                if(window.confirm("Are you sure you want to delete this conversation?")){
                    deleteConversation(chatroomId)
                }
            }} >
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" >

            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"></path>
            </svg>
        </button>
    
        {/* <div style={{position:"absolute", width:"100px", height:"100px",right:"0", bottom:"bottom", backgroundColor:"#000000"}}></div> */}
    
    
    </div>


    )
}


export default ConvoCard;