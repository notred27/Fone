import React, {useRef}from 'react';


function DateHeader({date, time, btnStyle, removeFunc, chatroomId, id}) {
    const bodyRef = useRef(null)

    /**
     * Delete the current dateHeader object, and all references to it in Firebase.
     */
    function deleteHeader() {
        removeFunc(chatroomId, id);
    }
    
    return (
        <div className='date' ref = {bodyRef} >
            <span style={{ fontWeight:"bold"}}>{date},</span>
            <span>{time}</span>
            
            <span className = "flexRow" style={{width:"100%", justifyContent:"center"}}>
                <button className = "HideButton" style = {{display:`${btnStyle}`}} onClick = {deleteHeader}>Remove</button>
                <button className = "HideButton" style = {{display:`${btnStyle}`}} >Hide</button>
            </span>
            
        </div>
    );

}


export default DateHeader