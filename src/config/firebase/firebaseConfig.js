import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxxGOzTyntn5YEC3hzaCNcNV_uNg8erio",
  authDomain: "object-following-drone.firebaseapp.com",
  projectId: "object-following-drone",
  storageBucket: "object-following-drone.appspot.com",
  messagingSenderId: "106185170531",
  appId: "1:106185170531:web:4fb26e462fde6848882256",
  measurementId: "G-DGFQSBW0RC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth