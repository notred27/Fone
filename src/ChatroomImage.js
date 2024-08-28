import { fileDeletion } from "./firebase";


/**
 * A component that stores an image sent by either the "user" or the "reciever".
 * @param {Array} props Data to create the image and functions to delete it.
 */

// TODO: Pass in props of the form {data, functions} to reduce clutter
function ChatroomImage({id, url, filename, imageType, btnStyle, removeFunc, chatroomId}) {
    // TODO: Make it so that when a use clicks on an image, it expands and they can zoom in/out
    // IDEA: Make a wrapper for both image and message objects so the hide/show code doesn't need to be duplicated
    // const imgRef = useRef(null)
    // const [isShowing, setIsShowing] = useState(false)

    /**
     * Delete the current image object, and all references to it in Firebase.
     */
    function deleteImage() {
        fileDeletion(filename);     // Remove file in Firebase Storage
        removeFunc(chatroomId, id); // Remove references to the file in Firestore
    }
    
    return (
        <div style = {{position:"relative", width:"100%", maxHeight:"40vh", overflow:"hidden", marginBottom:"5px"}}>
            <img className={`chatImg ${imageType}`} src = {url} alt = "msg_pic" />
            
            <div className='flexRow'>
                <button className = "HideButton" onClick = {deleteImage} style = {{display:`${btnStyle}`, position:"relative"}}>Remove</button>
                <button className = "HideButton" style = {{display:`${btnStyle}`, position:"relative"}}>Hide</button>
            </div>   
        </div>
    );
}

export default ChatroomImage;
