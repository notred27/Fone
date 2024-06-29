import React from 'react';
import './App.css';

import userImg from './images/user.png';
import facetimeImg from './images/facetime.png';
import arrowImg from './images/arrow.png';



function Header({name, hideFunc}) {



    return (
        <div style={{backgroundColor:"rgba(240, 240, 240, 0.97)", height:"fit-content", borderBottom:"#AAAAAA 2px solid", display:"grid", gridTemplateColumns:"20% 60% 20%", textAlign:"center", position:"sticky", top:"0px", zIndex:"100"}}>
            <img src = {arrowImg} alt = "flair" style = {{height:"20px", marginLeft:"20px", marginTop:"22px"}}/>

            <figure>
                <img src = {userImg} alt = "user" style={{width:"30px"}}></img>
                <figcaption className='title' style={{textAlign:"center"}}>{name}</figcaption>
            </figure>

            <img src = {facetimeImg} alt = "toggleEdit" onClick={() => (hideFunc())} style = {{width:"40px", marginRight:"20px", marginTop:"16px"}}/>
        </div>

    )
}

export default Header