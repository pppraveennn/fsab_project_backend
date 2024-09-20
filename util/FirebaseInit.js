// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD73rS2P6pORoIFE4FQFhPdNggyzJFb6c0",
  authDomain: "fsab-bootcamp-dd397.firebaseapp.com",
  projectId: "fsab-bootcamp-dd397",
  storageBucket: "fsab-bootcamp-dd397.appspot.com",
  messagingSenderId: "781704331264",
  appId: "1:781704331264:web:6a7ba7ac36d267f7c7d8e5",
  measurementId: "G-KR2S6MEGMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);