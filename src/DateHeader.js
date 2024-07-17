import React, {useRef}from 'react';
import './App.css';



function DateHeader({date, time, btnStyle, removeFunc, chatroomId, id}) {
    const bodyRef = useRef(null)

    function showBody() {
        removeFunc(chatroomId, id);
    }
    

    return (
       


        <div className='date' ref = {bodyRef} ><span style={{ fontWeight:"bold"}}>{date},</span> {time} 
        <span className = "flexRow" style={{width:"100%", justifyContent:"center"}}>
            <button className = "HideButton" style = {{display:`${btnStyle}`}} onClick = {() => (showBody())}>Remove</button>
            <button className = "HideButton" style = {{display:`${btnStyle}`}} >Hide</button>
        

        </span>
            
        </div>

    );

}


export default DateHeader