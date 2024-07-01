import React, {useRef, useState} from 'react';
import './App.css';

import userImg from './images/user.png';
import facetimeImg from './images/facetime.png';
import arrowImg from './images/arrow.png';



function Header({initialName, hideFunc}) {
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
        <div className= 'headerBox' >
            <img src = {arrowImg} alt = "flair" style = {{height:"20px", marginLeft:"20px", marginTop:"22px"}}/>

            {isHidden ? 
            <figure>
                <img src = {userImg} alt = "user" style={{width:"30px"}}></img>
                <figcaption className='title' style={{textAlign:"center"}}>{name}</figcaption>
            </figure>

            :

            <input ref = {nameBarRef} placeholder={name} style = {{height:"1em"}}></input>
            }

            <img src = {facetimeImg} alt = "toggleEdit" onClick={hideDebug} style = {{width:"40px", marginRight:"20px", marginTop:"16px"}}/>
        </div>

    )
}

export default Header