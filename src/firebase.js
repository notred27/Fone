import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

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

