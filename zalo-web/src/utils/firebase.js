import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIG38VAJGtvOEP5mlZjUflyTc_dFSHA90",
  authDomain: "zaloapp-329e0.firebaseapp.com",
  projectId: "zaloapp-329e0",
  storageBucket: "zaloapp-329e0.appspot.com",
  messagingSenderId: "545462868795",
  appId: "1:545462868795:web:0e74f707883ab0b31bf51e",
  measurementId: "G-87DVY3166K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
