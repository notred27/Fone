import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { setDoc, addDoc, deleteDoc, doc,  collection, serverTimestamp, getCountFromServer, getFirestore, query} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject  } from "firebase/storage";

/* NOTE: This is temporary API information to be used during development. 
 * In a real-world application, this would never be public. However, due to
 * issues with AWS Amplify not recognizing .env files with react, this was 
 * temporarily included and all keys will be discarded (and regenerated) in
 * a later production version.
*/
const FIREBASE_API_CONFIG = {
    apiKey: "AIzaSyDDWNc4FAG_CjvyEW9sL-uiLXjsvGgRzCk",
    authDomain: "joe-app-8330b.firebaseapp.com",
    projectId: "joe-app-8330b",
    storageBucket: "joe-app-8330b.appspot.com",
    messagingSenderId: "4705277287",
    appId: "1:4705277287:web:42a977395d0fef9d300bc2",
    measurementId: "G-WKLE7YY73N"
  };
  
// Initialize firebase according to API configuration
const app = initializeApp(FIREBASE_API_CONFIG);

// Export info that will be used by other components
export const auth = getAuth(app)
export const db = getFirestore(app)


/**
 * Delete a document from the Firestore database.
 * @param {String} chatroomId   ID of the target chatroom.
 * @param {String} messageDocId ID of the document that is being deleted.
 */
// TODO: Rename thsi function?
export const deleteMessage = async (chatroomId, messageDocId) => {
  await deleteDoc(doc(db, "Chatrooms", chatroomId, "messages", messageDocId));
}


/**
 * Create a document that represents a Message component in the Firestore database.
 * @param {String} chatroomId ID of the target chatroom.
 * @param {String} msg        The content of the message.
 * @param {String} msgType    Determines the style of the message.
 */
// TODO: change msgType to be the boolean "fromUser?"
export const sendMessage = async (chatroomId, msg, msgType) => {
  const { uid } = auth.currentUser;
  await addDoc(collection(db, "Chatrooms", chatroomId, "messages"), {
      text: msg,
      isShowing: true,
      type: msgType,
      createdAt: serverTimestamp(),
      uid,
      });
}


/**
 * Create a document that represents a DateHeader component in the Firestore database.
 * @param {String} chatroomId ID of the target chatroom.
 * @param {String} date            The date (e.g., Today, Monday, April 27th) of the header.
 * @param {String} time            The timestamp (e.g., 12:45 PM, 23:12) of the header.
 */
export const sendTimestamp = async (chatroomId, date, time) => {
  const { uid } = auth.currentUser;
  await addDoc(collection(db, "Chatrooms", chatroomId, "messages"), {
      date: date,
      time: time,
      type: "timestamp",
      createdAt: serverTimestamp(),
      uid,
      });
}


/**
 * Creates a document representing a Chatroom in the Firestore database.
 * @param {String} roomName The name of the chatroom as it will appear in the main menu.
 * @param {String} userName The display name of the user in the chatroom.
 * @param {String} style    String corresponding to a display theme ("imessage"/"sms"/"gmessage").
 */
// TODO: Make the style param into a constant enum somewhere (e.g. CHATROOM_STYLES.SMS)
export const createConversation = async (roomName, userName, style) => {
  const uid = auth.currentUser["uid"];
  const photoURL = auth.currentUser["photoURL"];
  const chatId =  doc(collection(db, "Chatrooms"));
  
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
    uid,
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


/**
 * Get the current number of documents in the Firestore database collection "Chatrooms".
 * @returns {int} Current number of chatrooms.
 */
export const getNumConversations = async () => {
  const q = query( collection(db, "Chatrooms"));
  const length = await getCountFromServer(q);
  return length.data().count;
}


/**
 * Set the display name of the chatroom's "reciever".
 * @param {String} chatroomId ID of the target chatroom.
 * @param {String} name            Name of the user.
 */
export const setDisplayName = async (chatroomId, name) => {
  await setDoc(doc(db, "Chatrooms", chatroomId), {
      username: name      // Set chatroom display name, and merge with previous data
    }, {merge:true})
}


/**
 * Set the current typing status of the chatroom's "reciever".
 * @param {String} chatroomId ID of the target chatroom.
 * @param {boolean} isTyping  Boolean representing if the other user is currently "typing" a message.
 */
export const setTypingStatus = async (chatroomId, isTyping) => {
  await setDoc(doc(db, "Chatrooms", chatroomId), {
      isTyping: isTyping // Set the current typing status of the chatroom
    }, {merge:true})
}


/**
 * Sets the text flair of the most recenly sent message from the user.
 * @param {String} chatroomId ID of the target chatroom.
 * @param {String} flair      String representing message dilivery status (e.g., "Seen", "Delivered", "").
 */
export const setMessageFlair = async (chatroomId, flair) => {
  await setDoc(doc(db, "Chatrooms", chatroomId), {
    messageflair: flair  // Set chatroom flair style and merge with previous data
  }, {merge:true})
}


// TODO: Combine hideMessage and showMessage into a single function called setMessageVisability(chatId, msgId, isShowing)
/**
 * Set the visability of a target message to hidden.
 * @param {String} chatroomId ID of the target chatroom.
 * @param {String} messageId  ID of the target message.
 */
export const hideMessage = async (chatroomId, messageId) => {
  await setDoc(doc(db, "Chatrooms", chatroomId, "messages", messageId), {
    isShowing: false
  }, {merge:true})
}


/**
 * Set the visability of a target message to visable.
 * @param {String} chatroomId ID of the target chatroom.
 * @param {String} messageId  ID of the target message.
 */
export const showMessage = async (chatroomId, messageId) => {
  await setDoc(doc(db, "Chatrooms", chatroomId, "messages", messageId), {
    isShowing: true
  }, {merge:true})
}


/**
 * Upload an image to display as the reciever's profile picture to Firebase Storage, and a reference to that image in Firestore.
 * @param {String} chatroomId ID of the target chatroom.
 * @param {File} file         File (Blob) that holds image data (file format doesn't matter as long as it is some type of image format).
 */
export const profilePicUpload = async (chatroomId, file) => {
  const storage = getStorage()
  const storageRef = ref(storage, `${chatroomId}/profile_picture`); // Path is roomId/userId_timestamp

  // Upload image to Firebase Storage
  uploadBytes(storageRef, file).then((snapshot) => {
 
    // Get token and access URL
    getDownloadURL(storageRef).then((url) => 

      // Upload the url hosting the image to firebase
      setDoc(doc(db, "Chatrooms", chatroomId), {
        profile_picture: url
      }, {merge:true})
    )
  });
}


// TODO: Change the name of this method to reflect that it should only be uised with images. Also check if the imageType param is needed
/**
 * Upload an image to Firebase Storage, and a reference to that image in Firestore.
 * @param {String} chatroomId ID of the target chatroom.
 * @param {*} imageType       Format of the uploade file.
 * @param {*} file            File (Blob) that holds image data.
 */
export const fileUpload = async (chatroomId, imageType, file) => {
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
        url: url,
        filename: filename,
        type: imageType,
        createdAt: serverTimestamp(),
        uid,
      })
    )
  });
}


/**
 * Delete a file stored in Firebase Storage.
 * @param {String} path Path to the target file that is stored.
 */
export const fileDeletion = async (path) => {
  const storage = getStorage()
  const storageRef = ref(storage, path); // Get a reference to the file

  // Delete the file from Firebase Storage
  deleteObject(storageRef)
}
