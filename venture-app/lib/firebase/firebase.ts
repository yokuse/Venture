// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "venturev2-4908b.firebaseapp.com",
  projectId: "venturev2-4908b",
  storageBucket: "venturev2-4908b.appspot.com",
  messagingSenderId: "67652791997",
  appId: "1:67652791997:web:6b968299147ff39de811d4",
  measurementId: "G-PVM89KRXBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);



