// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBggJi5rZYU0j7iRIVQgDtyQsOhOrvN3VQ",
  authDomain: "chat-app-bf43a.firebaseapp.com",
  projectId: "chat-app-bf43a",
  storageBucket: "chat-app-bf43a.appspot.com",
  messagingSenderId: "112428686852",
  appId: "1:112428686852:web:0328763cfb3c9d537f9f51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
