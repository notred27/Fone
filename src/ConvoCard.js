import { deleteConversation} from './firebase.js';

import imessageBanner from './images/imessageBanner.png'
import smsBanner from './images/smsBanner.png'
import gmessageBanner from './images/gmessageBanner.png'


function ConvoCard({chatroomId, chatroomName, enterChatroom, style}) {
    
    let cardTheme = imessageBanner;
    if (style === "sms") {
        cardTheme = smsBanner;
    } else if (style === "gmessage") {
        cardTheme = gmessageBanner;
    }

    function deleteCard() {
        if(window.confirm("Are you sure you want to delete this conversation?")){
            deleteConversation(chatroomId)
        }
    }

    return (
    // <div style={{position:"relative"}}>
    //     <img src = {cardTheme}  alt = "convoCardImg" className='convoCard' onClick = {() => {enterChatroom(chatroomId)}}></img>
        
    //     <div>
    //     <h5 style = {{margin:"0px", padding:"0px", width:"140px", border:"solid white 2px", marginLeft:"10px"}}>{chatroomName}</h5>
        
        
    //     <button className = "kebab-btn" onClick={() => {
    //             if(window.confirm("Are you sure you want to delete this conversation?")){
    //                 deleteConversation(chatroomId)
    //             }
    //         }} >
    //         <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" >

    //         <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"></path>
    //         </svg>
    //     </button>
    //     </div>
    
    //     {/* <div style={{position:"absolute", width:"100px", height:"100px",right:"0", bottom:"bottom", backgroundColor:"#000000"}}></div> */}
    
    
    // </div>


<div style={{position:"relative", width:"250px", height:"fit-content", margin:"10px", boxShadow:"-2px 2px 2px gray", backgroundColor:"gray", borderBottomRightRadius:"15px", borderBottomLeftRadius:"15px"}} >

    <img className= "conversationCard" src={cardTheme} alt='style_banner' style={{margin:"0px"}} onClick = {() => {enterChatroom(chatroomId)}}></img>

    <div style={{position:"relative", backgroundColor:"white", padding:"10px", textAlign:"left", borderBottomRightRadius:"15px", borderBottomLeftRadius:"15px"}}>

        <div className='convoDropdown' style = {{float:"right", position:"absolute", right:"4px", top:"0px", display:"inline-block"}}>
            <button style={{ padding:"2px", backgroundColor:"white", border:"0px", borderRadius:"10px"}} >
                <svg width="22" height="6" viewBox="0 0 22 6" fill="none" >
                    <circle cx="3" cy="3" r="3" fill="black"/>
                    <circle cx="11" cy="3" r="3" fill="black"/>
                    <circle cx="19" cy="3" r="3" fill="black"/>
                </svg>
            </button>

            <div className='convoDropdownItems'>
                <div>Rename</div>
                <div>Theme</div>
                <div onClick={deleteCard} style={{color:"red"}}>Delete</div>
            </div>
            

        </div>
        

        <h3 style={{paddingLeft:"10px", margin:"0px", width:"200px",  textOverflow:"ellipsis", overflow:"hidden", display:"block", whiteSpace:"nowrap"}}>{chatroomName}</h3>
        <h6 style={{paddingLeft:"10px", paddingBottom:"10px", marginBottom:"0px", marginTop:"0px", color:"#777777"}}>15 messages</h6>

        {/* <button style={{position:"absolute", backgroundColor:"black", color:"white", border:"0px", fontWeight:"bold", borderRadius:"20px", fontSize:"1.3em", right:"10px", bottom:"5px"}}>Enter</button> */}
    </div>

</div>


    )
}


export default ConvoCard;