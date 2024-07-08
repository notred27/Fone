import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getCountFromServer, getFirestore, query} from "firebase/firestore";
import {setDoc, addDoc, deleteDoc, doc,  collection, serverTimestamp} from "firebase/firestore";


const FIREBASE_API_CONFIG = {

    apiKey: "AIzaSyDDWNc4FAG_CjvyEW9sL-uiLXjsvGgRzCk",
  
    authDomain: "joe-app-8330b.firebaseapp.com",
  
    projectId: "joe-app-8330b",
  
    storageBucket: "joe-app-8330b.appspot.com",
  
    messagingSenderId: "4705277287",
  
    appId: "1:4705277287:web:42a977395d0fef9d300bc2",
  
    measurementId: "G-WKLE7YY73N"
  
  };
  

const app = initializeApp(FIREBASE_API_CONFIG);

export const auth = getAuth(app)
export const db = getFirestore(app)

export const deleteMessage = async (chatroomId, messageDocId) => {

  await deleteDoc(doc(db, "Chatrooms", chatroomId, "messages", messageDocId));

}

export const sendMessage = async (chatroomId, msg, msgType) => {
  const { uid } = auth.currentUser;
  await addDoc(collection(db, "Chatrooms", chatroomId, "messages"), {
      text: msg,
      type: msgType,
      createdAt: serverTimestamp(),
      uid,
      });
}


export const createConversation = async (roomName, userName, theme) => {
  const { uid, displayName, photoURL } = auth.currentUser;

  const chatId =  doc(collection(db, "Chatrooms"));
  
  // Set chatroom fields
  await setDoc(doc(db, "Chatrooms", chatId.id), {
      style: theme,
      username: userName,
      roomName: roomName,
      userPic: photoURL,
      createdAt: serverTimestamp(),
      // uid
    })

  // Create messages collection for this chatroom
  await addDoc(collection(db, "Chatrooms", chatId.id, "messages"), {
    createdAt: serverTimestamp(),
    uid,
  })

  // return chatId.id;
}

export const deleteConversation = async (chatroomId) => {
  // FIXME: Come up with a solution to delete the messages subcollections 
  await deleteDoc(doc(db, "Chatrooms", chatroomId))
}

export const getNumConversations = async () => {
  const q = query( collection(db, "Chatrooms"));
  const length = await getCountFromServer(q);
  // .then(results => return )

  return length.data().count;
  // console.log(length.data().count)
}