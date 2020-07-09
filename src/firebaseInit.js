import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBe23vGrWbbtK6cWQflEewoDvTBtKWQEBM",
  authDomain: "test-project-116cf.firebaseapp.com",
  databaseURL: "https://test-project-116cf.firebaseio.com",
  projectId: "test-project-116cf",
  storageBucket: "test-project-116cf.appspot.com",
  messagingSenderId: "507446435196",
  appId: "1:507446435196:web:ccd56d1abf6f31a8e058f9",
  measurementId: "G-BVQFXBP732"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
