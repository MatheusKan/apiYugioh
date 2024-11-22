
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  

const firebaseConfig = {
  apiKey: "AIzaSyBtoGAyiNEqmUCVFaXVY2a3zhxWNS3ny0w",
  authDomain: "apiyugioh.firebaseapp.com",
  projectId: "apiyugioh",
  storageBucket: "apiyugioh.firebasestorage.app",
  messagingSenderId: "452971978729",
  appId: "1:452971978729:web:f1b50fe6671a567ac0f578",
  measurementId: "G-QNXV40GRPS"
};
 
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);