import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB9RJPAtsbZLjC8th7lRTMrLdCODlNLV4k",
  authDomain: "eyes-movement-stat-app.firebaseapp.com",
  projectId: "eyes-movement-stat-app",
  storageBucket: "eyes-movement-stat-app.appspot.com",
  messagingSenderId: "845169296336",
  appId: "1:845169296336:web:b698999c119ed3624c6fd5",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
