function ChatroomImage({id, url, imageType, btnStyle, removeFunc, chatroomId}) {
    


    function showBody() {
        removeFunc(chatroomId, id);

        // TODO: Also remove image from Storage DB
    }
    
    console.log(url)

    return (
        <div style = {{position:"relative", width:"100%", maxHeight:"40vh", overflow:"hidden"}}>
            {/* <div className={`${imageType}`} style = {{marginRight:"10px"}} > */}
               
                <img className={`${imageType}`} src = {url} alt = "msg_pic"></img>


                <div className='flexRow'>
                    <button className = "HideButton" onClick = {() => (showBody())} style = {{display:`${btnStyle}`, position:"relative"}}>Remove</button>
                    <button className = "HideButton" style = {{display:`${btnStyle}`, position:"relative"}}>Hide</button>
                </div>
                                
            {/* </div> */}

            

        </div>
    );
}

export default ChatroomImage;
