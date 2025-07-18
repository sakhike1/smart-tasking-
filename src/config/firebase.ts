// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGLd_pvOVSe_9LWHUURK7u1lliI7_LAkU",
  authDomain: "taskappai-fa402.firebaseapp.com",
  projectId: "taskappai-fa402",
  storageBucket: "taskappai-fa402.firebasestorage.app",
  messagingSenderId: "395263245411",
  appId: "1:395263245411:web:b7dd8558f87be77a0b0c56",
  measurementId: "G-J56LK30SFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth }; 