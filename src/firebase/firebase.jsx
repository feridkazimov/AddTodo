// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhH7RycGhgV5isoI0SXpp8sTLiKQjkC1A",
  authDomain: "todoapp-f5007.firebaseapp.com",
  projectId: "todoapp-f5007",
  storageBucket: "todoapp-f5007.appspot.com",
  messagingSenderId: "571354005001",
  appId: "1:571354005001:web:a9562f75176e3307dbc2d8",
  measurementId: "G-DZBR3VERZ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
