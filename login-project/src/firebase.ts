
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIyrITy1BshbjbzxnX_v31epWgvaTVPrk",
  authDomain: "backend-login-db.firebaseapp.com",
  projectId: "backend-login-db",
  storageBucket: "backend-login-db.appspot.com",
  messagingSenderId: "385455279439",
  appId: "1:385455279439:web:d2af28ce09d390216f893a",
  measurementId: "G-BM7XKSLKGV"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };