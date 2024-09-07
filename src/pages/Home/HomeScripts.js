import { db, auth } from '../../firebase.js'
import { setDoc, addDoc, deleteDoc, doc, collection, serverTimestamp, query, getCountFromServer } from "firebase/firestore";

/**
 * Get the current number of documents in the Firestore database collection "Chatrooms".
 * @returns {int} Current number of chatrooms.
 */
export const getNumConversations = async () => {
    const q = query(collection(db, "Chatrooms"));
    const length = await getCountFromServer(q);
    return length.data().count;
}

/**
 * Change the display name of a specified chatroom
 * @param {String} chatroomId ID of the target chatroom.
 * @param {String} newName    The new name of the chatroom 
 */
export const setChatroomName = async (chatroomId, newName) => {
    setDoc(doc(db, "Chatrooms", chatroomId), {
        roomName: newName
    }, { merge: true })
}

/**
 * Change the display name of a specified chatroom
 * @param {String} chatroomId ID of the target chatroom.
 * @param {String} newName    The new name of the chatroom 
 */
export const setChatroomTheme = async (chatroomId, newTheme) => {
    setDoc(doc(db, "Chatrooms", chatroomId), {
        style: newTheme
    }, { merge: true })
}


/**
 * Creates a document representing a Chatroom in the Firestore database.
 * @param {String} roomName The name of the chatroom as it will appear in the main menu.
 * @param {String} userName The display name of the user in the chatroom.
 * @param {String} style    String corresponding to a display theme ("imessage"/"sms"/"gmessage"/"whatsapp").
 */
export const createConversation = async (roomName, userName, style) => {
    const uid = auth.currentUser["uid"];
    const photoURL = auth.currentUser["photoURL"];
    const chatId = doc(collection(db, "Chatrooms"));

    await setDoc(doc(db, "Chatrooms", chatId.id), { // Set chatroom fields
        style: style,
        username: userName,
        roomName: roomName,
        userPic: photoURL,
        createdAt: serverTimestamp(),
    })

    // Create a messages collection for this chatroom
    await addDoc(collection(db, "Chatrooms", chatId.id, "messages"), {
        createdAt: serverTimestamp(),
        createdBy: uid,

        obj: "Message",
        type: "server",
        text: "Welcome to the chatroom!",
        isShowing: true,
    })
}

/**
* Deletes a chatroom document from teh Firestore database.
* @param {String} chatroomId ID of the target chatroom.
*/
export const deleteConversation = async (chatroomId) => {
    // FIXME: Come up with a solution to delete messages subcollections
    await deleteDoc(doc(db, "Chatrooms", chatroomId))
}