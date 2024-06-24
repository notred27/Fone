import React, {useRef}from 'react';
import './app.css';


function DateHeader({date, time}) {
    const bodyRef = useRef(null)

    function showBody() {
    console.log(bodyRef.current.style.display)
    bodyRef.current.style.display = "none"

    //Fix this to somehow remove the objects from the actual html
    }
    

    return (
       


        <div className='date' ref = {bodyRef} ><span style={{ fontWeight:"bold"}}>{date},</span> {time} 
            <button className = "HideButton" onClick = {() => (showBody())}>X</button>
        
        </div>

    );

}


export default DateHeader