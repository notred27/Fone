import React, {useRef, useState, useEffect} from 'react';
import './App.css';

import defaultImg from './images/user.png';
import facetimeImg from './images/facetime.png';
import arrowImg from './images/arrow.png';


import {query, onSnapshot, doc} from "firebase/firestore";
import {db, setDisplayName, profilePicUpload} from './firebase.js';


function Header({chatroomId, hideFunc, exitRoom}) {
    const [isHidden, setIsHidden] = useState(true);
    const [name, setName] = useState("_");
    const [userImg, setUserImg] = useState(defaultImg)
    const nameBarRef = useRef(null);

    const hideDebug = () => {

        setIsHidden(!isHidden)
        hideFunc()

        if(!isHidden && nameBarRef.current.value !== "") {
            setName(nameBarRef.current.value)
            setDisplayName( chatroomId, nameBarRef.current.value)
        }
    }


    useEffect(() => {
        if(chatroomId !== null) {
            const q = query(doc(db, "Chatrooms", chatroomId))
            onSnapshot(q, (snapshot) => {
                setName(snapshot.data().username);

                if(snapshot.data().profile_picture != undefined){
                    setUserImg(snapshot.data().profile_picture)
                }
            })
        }


    },[chatroomId])


    function uploadPicture() {
        console.log("hello world")
        const img = document.getElementById('profilePicInput').files[0];
        console.log(img.type)
        profilePicUpload(chatroomId, img);
    }
    
    return (
        <div className= 'headerBox' style={{alignItems:"center"}}>
            <img src = {arrowImg} alt = "flair" style = {{placeSelf:"center", height:"15px"}} onClick={() => (exitRoom(null))}/>

            {isHidden ? 
            <figure style = {{placeSelf:"center", margin:"5px", marginTop:"10px"}}>
                <img src = {userImg} alt = "user" style={{width:"30px", borderRadius:"20px"}} />
                <figcaption className='title' style={{textAlign:"center"}}>{name}</figcaption>
            </figure>

            :


            <div style = {{placeSelf:"center", margin:"5px"}}>
                <div >
                    <img src = {userImg} alt = "user" style={{width:"30px"}} />
                    <label>
                       {/* <button>Choose Image</button> */}
                        <input id = "profilePicInput" type = "file"  accept = "image/*" onChange={uploadPicture} ></input>

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