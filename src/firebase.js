import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getCountFromServer, getFirestore, query} from "firebase/firestore";
import {setDoc, addDoc, deleteDoc, doc,  collection, serverTimestamp} from "firebase/firestore";
// import { getFunctions, httpsCallable } from "firebase/functions";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";

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
      isShowing: true,
      type: msgType,
      createdAt: serverTimestamp(),
      uid,
      });
}

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

/**
 * From Firebase 
 * Call the 'recursiveDelete' callable function with a path to initiate
 * a server-side delete.
 */
// function deleteAtPath(path) {
//   const functions = getFunctions(app)
//   var deleteFn = functions.httpsCallable('recursiveDelete');
//   deleteFn({ path: path })
//       .then(function(result) {
//           console.log('Delete success: ' + JSON.stringify(result));
//       })
//       .catch(function(err) {
//           console.log('Delete failed, see console,');
//           console.warn(err);
//       });
// }



export const deleteConversation = async (chatroomId) => {
  // FIXME: Come up with a solution to delete messages subcollections 

  // deleteAtPath(`Chatrooms/${chatroomId}/messages` )
  await deleteDoc(doc(db, "Chatrooms", chatroomId))
}

export const getNumConversations = async () => {
  const q = query( collection(db, "Chatrooms"));
  const length = await getCountFromServer(q);
  // .then(results => return )

  return length.data().count;
  // console.log(length.data().count)

}

export const setDisplayName = async (chatroomId, name) => {

  // Set chatroom display name
  await setDoc(doc(db, "Chatrooms", chatroomId), {
      username: name
      // uid
    }, {merge:true})
}

export const setTypingStatus = async (chatroomId, isTyping) => {

  // Set chatroom display name
  await setDoc(doc(db, "Chatrooms", chatroomId), {
      isTyping: isTyping
      // uid
    }, {merge:true})
}

export const setMessageFlair = async (chatroomId, flair) => {
  // Set chatroom flair style
  await setDoc(doc(db, "Chatrooms", chatroomId), {
    messageflair: flair
    // uid
  }, {merge:true})
}

export const hideMessage = async (chatroomId, messageId) => {
  await setDoc(doc(db, "Chatrooms", chatroomId, "messages", messageId), {
    isShowing: false
  }, {merge:true})
}

export const showMessage = async (chatroomId, messageId) => {
  await setDoc(doc(db, "Chatrooms", chatroomId, "messages", messageId), {
    isShowing: true
  }, {merge:true})
}

export const profilePicUpload = async (chatroomId, file) => {
  const storage = getStorage()

  // Path is roomId/userId_timestamp
  const { uid } = auth.currentUser;
  const storageRef = ref(storage, `${chatroomId}/profile_picture`);

  // const metadata = {
  //   caption: file.name
  // }

  // Upload image to Firebase Storage
  uploadBytes(storageRef, file).then((snapshot) => {
 
    // Get token and access URL
    getDownloadURL(storageRef).then((url) => 

      // Upload filepath to firebase so it can be accessed by the app
      setDoc(doc(db, "Chatrooms", chatroomId), {
        profile_picture: url
      }, {merge:true})
    )
  });
}



export const fileUpload = async (chatroomId, imageType, file) => {
  const storage = getStorage()

  // Path is roomId/userId_timestamp
  const { uid } = auth.currentUser;
  const storageRef = ref(storage, `${chatroomId}/${uid}_${Date.now()}`);

  // const metadata = {
  //   caption: file.name
  // }

  // Upload image to Firebase Storage
  uploadBytes(storageRef, file).then((snapshot) => {
 
    // Get token and access URL
    getDownloadURL(storageRef).then((url) => 
      
      
      // Upload filepath to firebase so it can be accessed by the app
      addDoc(collection(db, "Chatrooms", chatroomId, "messages"), {
        url: url,
        type: imageType,
        createdAt: serverTimestamp(),
        uid,
        })
    )
  });

}
