// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi88fRn8S4tH4q0zCTPvx4c8CkUw9QHPo",
  authDomain: "book-worm-7fe21.firebaseapp.com",
  projectId: "book-worm-7fe21",
  storageBucket: "book-worm-7fe21.appspot.com",
  messagingSenderId: "958070813698",
  appId: "1:958070813698:web:0a00db31161f1cd5bce31b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;