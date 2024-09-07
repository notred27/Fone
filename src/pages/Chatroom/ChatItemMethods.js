import { db, auth } from '../../firebase.js'
import { setDoc, addDoc, deleteDoc, doc, collection, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


/**
 * Delete a document from the Firestore database.
 * @param {String} chatroomId   ID of the target chatroom.
 * @param {String} docId ID of the component document that is being deleted.
 */
export const removeChatComponent = async (chatroomId, docId) => {
    await deleteDoc(doc(db, "Chatrooms", chatroomId, "messages", docId));
}

/**
 * Delete an image file stored in Firebase Storage.
 * @param {String} path Path to the target file that is stored.
 */
export const removeImage = async (path) => {
    const storage = getStorage()
    const storageRef = ref(storage, path); // Get a reference to the file

    // Delete the file from Firebase Storage
    deleteObject(storageRef)
}


/**
 * Create a document that represents a Message component in the Firestore database.
 * @param {String} chatroomId           ID of the target chatroom.
 * @param {String} msg                  The content of the message.
 * @param {"client" | "server"} senderType    Determines the style of the message.
 */
export const addMessage = async (chatroomId, msg, senderType) => {
    const { uid } = auth.currentUser;
    await addDoc(collection(db, "Chatrooms", chatroomId, "messages"), {
        createdAt: serverTimestamp(),
        createdBy: uid,

        obj: "Message",
        type: senderType,
        text: msg,
        isShowing: true,
    });
}


/**
 * Upload an image to Firebase Storage, and a reference document to that image in Firestore.
 * @param {String} chatroomId                   ID of the target chatroom.
 * @param {"client" | "server"} senderType      Format of the uploade file.
 * @param {*} file                              File (Blob) that holds image data.
 */
export const addImage = async (chatroomId, senderType, file) => {
    const storage = getStorage()
    const { uid } = auth.currentUser;

    // Generate a path of the form: <roomId>/<userId>_<timestamp>
    const filename = `${chatroomId}/${uid}_${Date.now()}`;
    const storageRef = ref(storage, filename);

    // Upload image to Firebase Storage
    uploadBytes(storageRef, file).then((snapshot) => {

        // Get token and access URL
        getDownloadURL(storageRef).then((url) =>

            // Upload the url hosting the image to firebase, along with the generated name of the file
            addDoc(collection(db, "Chatrooms", chatroomId, "messages"), {
                createdAt: serverTimestamp(),
                createdBy: uid,

                obj: "Image",
                type: senderType,
                filename: filename,
                url: url,
                isShowing: true,
            })
        )
    });
}


/**
 * Create a document that represents a DateHeader component in the Firestore database.
 * @param {String} chatroomId ID of the target chatroom.
 * @param {String} date            The date (e.g., Today, Monday, April 27th) of the header.
 * @param {String} time            The timestamp (e.g., 12:45 PM, 23:12) of the header.
 */
export const addTimestamp = async (chatroomId, date, time) => {
    const { uid } = auth.currentUser;
    await addDoc(collection(db, "Chatrooms", chatroomId, "messages"), {
        createdAt: serverTimestamp(),
        createdBy: uid,

        obj: "Timestamp",
        date: date,
        time: time,
        isShowing: true,
    });
}


/**
 * Set the current typing status of the chatroom's "reciever".
 * @param {String} chatroomId ID of the target chatroom.
 * @param {boolean} isTyping  Boolean representing if the other user is currently "typing" a message.
 */
export const setIsTyping = async (chatroomId, isTyping) => {
    await setDoc(doc(db, "Chatrooms", chatroomId), {
        isTyping: isTyping // Set the current typing status of the chatroom
    }, { merge: true })
}

/**
* Sets the text flair of the most recenly sent message from the user.
* @param {String} chatroomId ID of the target chatroom.
* @param {String} flair      String representing message dilivery status (e.g., "Seen", "Delivered", "").
*/
export const setMessageFlair = async (chatroomId, flair) => {
    await setDoc(doc(db, "Chatrooms", chatroomId), {
        messageflair: flair  // Set chatroom flair style and merge with previous data
    }, { merge: true })
}


/**
 * Set the visibility of a target message.
 * @param {String} chatroomId ID of the target chatroom.
 * @param {String} messageId  ID of the target message. 
 * @param {boolean} isShowing Represents if the message is showing to the user.
 */
export const setMessageVisibility = async (chatroomId, messageId, isShowing) => {
    await setDoc(doc(db, "Chatrooms", chatroomId, "messages", messageId), {
        isShowing: isShowing
    }, { merge: true })
}



/**
 * Set the display name of the chatroom's "reciever".
 * @param {String} chatroomId ID of the target chatroom.
 * @param {String} name            Name of the user.
 */
export const setUsername = async (chatroomId, name) => {
    await setDoc(doc(db, "Chatrooms", chatroomId), {
        username: name      // Set chatroom display name, and merge with previous data
    }, { merge: true })
}


/**
 * Upload an image to display as the reciever's profile picture to Firebase Storage, and a reference to that image in Firestore.
 * @param {String} chatroomId ID of the target chatroom.
 * @param {File} file         File (Blob) that holds image data (file format doesn't matter as long as it is some type of image format).
 */
export const setProfilePic = async (chatroomId, file) => {
    const storage = getStorage()
    const storageRef = ref(storage, `${chatroomId}/profile_picture`); // Path is roomId/userId_timestamp

    // Upload image to Firebase Storage
    uploadBytes(storageRef, file).then((snapshot) => {

        // Get token and access URL
        getDownloadURL(storageRef).then((url) =>

            // Upload the url hosting the image to firebase
            setDoc(doc(db, "Chatrooms", chatroomId), {
                profilePic: url
            }, { merge: true })
        )
    });
}