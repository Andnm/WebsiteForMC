// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq3jkOqletrp2Y8sZzYm9NmUz1lv_V6Do",
  authDomain: "website-for-mc.firebaseapp.com",
  projectId: "website-for-mc",
  storageBucket: "website-for-mc.appspot.com",
  messagingSenderId: "167218626809",
  appId: "1:167218626809:web:e40a6c746a2ffc81312228",
  measurementId: "G-M5J06VBZ2E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const storage = getStorage(app);
const providerFacebook = new FacebookAuthProvider();
const db = getFirestore();

export { auth, providerGoogle, providerFacebook, storage, db };