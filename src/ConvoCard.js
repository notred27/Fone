import { deleteConversation} from './firebase.js';



function ConvoCard({chatroomId, chatroomName, enterChatroom}) {



    return (
    <div style={{position:"relative"}}>
        <button className="convoCard" onClick = {() => {enterChatroom(chatroomId)}}> ! </button>
        <h5>{chatroomName}</h5>

        {/* TODO: Make a toggle for delete mode and add a confirmation dialogue */}
        <button onClick={() => {
            if(window.confirm("Delete this conversation?"))
                deleteConversation(chatroomId)
            }
            } style = {{position:"absolute", top:"0", right:"0", backgroundColor:"#ececec", color:"#444444", border:"4px solid #444444", fontWeight:"bold", borderRadius:"50px"}}>x</button>
    </div>
    )
}


export default ConvoCard;