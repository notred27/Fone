function Image({id, url, imageType, btnStyle, removeFunc, chatroomId}) {

    function showBody() {
        removeFunc(chatroomId, id);
    }
    
    console.log(imageType)

    return (
        <div style = {{position:"relative", width:"100%"}}>
            {/* <div className={`${imageType}`} style = {{marginRight:"10px"}} > */}
                
                <img  src = {url} style={{maxWidth:"90%", maxHeight:"40vh", paddingLeft:"10px", paddingLeft:"auto"}}></img>

                <div className='flexRow'>
                    <button className = "HideButton" onClick = {() => (showBody())} style = {{display:`${btnStyle}`, position:"relative"}}>Remove</button>
                    <button className = "HideButton" style = {{display:`${btnStyle}`, position:"relative"}}>Hide</button>
                </div>
                                
            {/* </div> */}

            

        </div>
    );
}

export default Image;
