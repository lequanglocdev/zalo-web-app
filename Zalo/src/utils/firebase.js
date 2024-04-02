import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDS5lZHBfu4lq06cE8-f_cOqSYZhCxrIJ4",
  authDomain: "zaloappwe.firebaseapp.com",
  projectId: "zaloappwe",
  storageBucket: "zaloappwe.appspot.com",
  messagingSenderId: "84538472997",
  appId: "1:84538472997:web:08a9a9890c21ec1bc71dcc",
  measurementId: "G-L3KN6C1X1Q",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
