import React from 'react';
import WhatsappHeader from './WhatsappHeader.js';
import WhatsappKeyboard from './WhatsappKeyboard.js';
import WhatsappBg from '../../../../assets/whatsappBg.png'

/**
 * A component that contains the styled elements of an imessage chatroom, and is linked to a specific Firestore database ID.
 * @param {Array<String, Function>} props The ID of the selected chatroom, and a function to set the value of the selected chatroom.
 */
function WhatsappChatroom({chatroomId, renderedMessages, enterDebug, exitRoom}) {

    return (
// FIXME: make it so that the background Image doesnt scroll, prob have to move up a component
        <div style={{backgroundImage:`url(${WhatsappBg})`}}>
            <WhatsappHeader chatroomId = {chatroomId} hideFunc = {enterDebug} exitRoom = {exitRoom} />
        
            {/* Header for Messages text */}
            <div className='date'><span style={{fontWeight:"bold"}}>Text Message</span></div>

            {renderedMessages}

            <WhatsappKeyboard chatroomId = {chatroomId} />
        </div>

    )
}

export default WhatsappChatroom;
