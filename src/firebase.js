// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLDMUFpwtKIACznNN2PvSIgYL-XxqKrjc",
  authDomain: "chat-app-7efca.firebaseapp.com",
  projectId: "chat-app-7efca",
  storageBucket: "chat-app-7efca.appspot.com",
  messagingSenderId: "48307167601",
  appId: "1:48307167601:web:5fdf579526d68c5a43d6d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
