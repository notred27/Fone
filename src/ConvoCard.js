import { deleteConversation} from './firebase.js';

import iPhoneConvoImage from './images/imessageConvo.png'
import smsConvoImage from './images/smsConvo.png'
import androidConvoImage from './images/gmessageConvo.png'


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
        <button onClick={() => {
                if(window.confirm("Are you sure you want to delete this conversation?")){
                    deleteConversation(chatroomId)

                }
            }}
            style = {{position:"absolute", top:"0", right:"0", backgroundColor:"#ececec", color:"#444444", border:"4px solid #444444", fontWeight:"bold", borderRadius:"50px"}}>x</button>
    </div>
    )
}


export default ConvoCard;