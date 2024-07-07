import React, {useRef, useState} from 'react';
import './App.css';

import userImg from './images/user.png';
import facetimeImg from './images/facetime.png';
import arrowImg from './images/arrow.png';



function Header({initialName, hideFunc, exitRoom}) {
    const [isHidden, setIsHidden] = useState(true);
    const [name, setName] = useState(initialName);
    const nameBarRef = useRef(null);

    const hideDebug = () => {
        setIsHidden(!isHidden)
        hideFunc()

        if(!isHidden && nameBarRef.current.value !== "") {
            setName(nameBarRef.current.value)
        }
    }
    
    return (
        <div className= 'headerBox' style={{alignItems:"center"}}>
            <img src = {arrowImg} alt = "flair" style = {{placeSelf:"center", height:"15px"}} onClick={() => (exitRoom(null))}/>

            {isHidden ? 
            <figure style = {{placeSelf:"center", margin:"5px", marginTop:"10px"}}>
                <img src = {userImg} alt = "user" style={{width:"30px"}} />
                <figcaption className='title' style={{textAlign:"center"}}>{name}</figcaption>
            </figure>

            :


            <div style = {{placeSelf:"center", margin:"5px"}}>
                <div >
                    <img src = {userImg} alt = "user" style={{width:"30px"}} />
                    <label>
                       {/* <button>Choose Image</button> */}
                        <input type = "file"  accept = "image/*" onClick={() => (console.log("profile clicked"))}></input>

                    </label>
                </div>

                <input ref = {nameBarRef} placeholder={name} style = {{height:"1em"}} />

            </div>
            }

            <img src = {facetimeImg} alt = "toggleEdit" onClick={hideDebug} style = {{placeSelf:"center",height:"15px"}}/>
        </div>

    )
}

export default Header