import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDRTFcMXEDdX6f6n9c8LsCidMuPuXgIKdY",
  authDomain: "writesapp-pl.firebaseapp.com",
  databaseURL: "https://writesapp-pl.firebaseio.com",
  projectId: "writesapp-pl",
  storageBucket: "writesapp-pl.appspot.com",
  messagingSenderId: "30094666538",
  appId: "1:30094666538:web:eae1dfec4bb0171f804c53",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
