// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyCNIJKfea_8qCZDFE3OyJdsGNIt2ynVZKo",
  authDomain: "smackchat-f6185.firebaseapp.com",
  databaseURL: "https://smackchat-f6185.firebaseio.com",
  projectId: "smackchat-f6185",
  storageBucket: "smackchat-f6185.appspot.com",
  messagingSenderId: "735274625297",
  appId: "1:735274625297:web:3315f5b058748b58ec84b0"
};

// Initialize Firebase
let firebaseApp=firebase.initializeApp(firebaseConfig);
let firebaseAuth=firebaseApp.auth()
let firebaseDb=firebaseApp.database()

export {firebaseAuth, firebaseDb}