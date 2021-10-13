// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwE0vdHYbozevPz921eDwu4hKjKdt4tV0",
  authDomain: "practiceportalforfyp.firebaseapp.com",
  projectId: "practiceportalforfyp",
  storageBucket: "practiceportalforfyp.appspot.com",
  messagingSenderId: "537834025270",
  appId: "1:537834025270:web:6d2c9cb20d0a4f475c0397",
  measurementId: "G-FQGVTJGSGQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
