// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIyrITy1BshbjbzxnX_v31epWgvaTVPrk",
  authDomain: "backend-login-db.firebaseapp.com",
  projectId: "backend-login-db",
  storageBucket: "backend-login-db.appspot.com",
  messagingSenderId: "385455279439",
  appId: "1:385455279439:web:d2af28ce09d390216f893a",
  measurementId: "G-BM7XKSLKGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }