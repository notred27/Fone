import React from 'react';
import './app.css';
import userImg from './images/user.png';
import facetimeImg from './images/facetime.png';
import arrowImg from './images/arrow.png';



function Header({name}) {

    function hide_buttons() {
        let buttons = document.getElementsByClassName("HideButton")

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].style.display === "none") {
                buttons[i].style.display = "block"

            } else {
                buttons[i].style.display = "none"
            }
        }
    }

    return (
        <div style={{backgroundColor:"rgba(240, 240, 240, 0.97)", height:"fit-content", borderBottom:"#AAAAAA 2px solid", display:"grid", gridTemplateColumns:"20% 60% 20%", textAlign:"center", position:"sticky", top:"0px"}}>
            <img src = {arrowImg} alt = "flair" style = {{height:"20px", marginLeft:"20px", marginTop:"22px"}}/>

            <figure>
                <img src = {userImg} alt = "user" style={{width:"30px"}}></img>
                <figcaption className='title' style={{textAlign:"center"}}>{name}</figcaption>
            </figure>

            <img src = {facetimeImg} alt = "toggleEdit" onClick={() => (hide_buttons())} style = {{width:"40px", marginRight:"20px", marginTop:"16px"}}/>
        </div>

    )
}

export default Header