import React, {useRef}from 'react';
import './App.css';



function DateHeader({date, time, btnStyle}) {
    const bodyRef = useRef(null)

    function showBody() {
    console.log(bodyRef.current.style.display)
    bodyRef.current.style.display = "none"

    //Fix this to somehow remove the objects from the actual html
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