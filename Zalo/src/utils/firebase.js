import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCb226Jd6q59rgwdkku8m8JezAIK0VagHc",
  authDomain: "appzalo-103be.firebaseapp.com",
  projectId: "appzalo-103be",
  storageBucket: "appzalo-103be.appspot.com",
  messagingSenderId: "246019057439",
  appId: "1:246019057439:web:dd4335611bb359cac4f22a",
  measurementId: "G-786ESNVEW9",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
