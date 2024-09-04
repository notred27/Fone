import React from 'react';
import ImessageHeader from './ImessageHeader';
import ImessageKeyboard from './ImessageKeyboard';

/**
 * A component that contains the styled elements of an imessage chatroom, and is linked to a specific Firestore database ID.
 * @param {Array<String, Function>} props The ID of the selected chatroom, and a function to set the value of the selected chatroom.
 */
function ImessageChatroom({chatroomId, renderedMessages, enterDebug, exitRoom}) {

    return (

        <div>
            <ImessageHeader chatroomId = {chatroomId} hideFunc = {enterDebug} exitRoom = {exitRoom} />
        
            {/* Header for Messages text */}
            <div className='date'><span style={{fontWeight:"bold"}}>Text Message</span></div>

            {renderedMessages}

            <ImessageKeyboard chatroomId = {chatroomId} />
        </div>

    )
}

export default ImessageChatroom;
