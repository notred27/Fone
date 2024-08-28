import defaultImg from './images/user.png';
import facetimeImg from './images/facetime.png';
import arrowImg from './images/arrow.png';

import React, {useRef, useState, useEffect} from 'react';
import {query, onSnapshot, doc} from "firebase/firestore";
import {db, setDisplayName, profilePicUpload} from './firebase.js';


// IDEA: CHange header to fixed to avoid movement on mobile?

function Header({chatroomId, hideFunc, exitRoom}) {
    const [isHidden, setIsHidden] = useState(true);     // Boolean for if debug mode is currently active
    const [name, setName] = useState("_");              // Stores the current username of the "reciever"
    const [userImg, setUserImg] = useState(defaultImg); // Stores the current profile picture of the "reciever"
    // TODO: Remove this useRef and replace it with document.getElementById
    const nameBarRef = useRef(null);                    // Stores the current value of the username input


    // Update the "reciever"'s profile picture and username when entering the chatroom
    useEffect(() => {
        if(chatroomId !== null) {
            const q = query(doc(db, "Chatrooms", chatroomId))
            onSnapshot(q, (snapshot) => {
                setName(snapshot.data().username);

                if(snapshot.data().profile_picture !== undefined){
                    setUserImg(snapshot.data().profile_picture)
                }
            })
        }
    },[chatroomId]);


    /**
     * Toggle if the header is in debug mode (i.e., showing the file select and username input), and save data when exiting debug mode.
     */
    function toggleDebug()  {
        setIsHidden(!isHidden);
        hideFunc();

        if(!isHidden && nameBarRef.current.value !== "") {
            // If debug mode is being closed, update the display name in firestore
            setName(nameBarRef.current.value);
            setDisplayName( chatroomId, nameBarRef.current.value);
        }
    }


    /**
     * Upload the chosen profile picture (in "profilePicInput") to both Firestore and Firebase Storage.
     */
    function uploadPicture() {
        if(document.getElementById('profilePicInput').files.length >= 1) {
            const img = document.getElementById('profilePicInput').files[0];
            profilePicUpload(chatroomId, img);
        }
    }
    
    return (
        <div className= 'headerBox' style={{alignItems:"center"}}>
            {/* Icon to exit this chatroom */}
            <img src = {arrowImg} alt = "flair" style = {{placeSelf:"center", height:"15px"}} onClick={() => (exitRoom(null))}/>

            {isHidden ? 
                // Display the header information in normal mode
                <figure style = {{placeSelf:"center", margin:"5px", marginTop:"10px"}}>
                    <img src = {userImg} alt = "user" style={{width:"30px", height:"30px", borderRadius:"20px"}} />
                    <figcaption className='title' style={{textAlign:"center"}}>{name}</figcaption>
                </figure>
            :
                // Display editable information in debug mode
                <div style = {{placeSelf:"center", margin:"5px"}}>
                    <div >
                        <img src = {userImg} alt = "user" style={{width:"30px"}} />
                        <label>
                            <input id = "profilePicInput" type = "file"  accept = "image/*" onChange={uploadPicture} />
                        </label>
                    </div>

                    <input ref = {nameBarRef} placeholder={name} style = {{height:"1em"}} />

                </div>
            }

            {/* Icon to toggle showing the debug menu */}
            <img src = {facetimeImg} alt = "toggleEdit" onClick={toggleDebug} style = {{placeSelf:"center",height:"15px"}}/>
        </div>

    )
}

export default Header