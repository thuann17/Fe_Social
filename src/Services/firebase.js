// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";  // Import deleteObject

const firebaseConfig = {
  apiKey: "AIzaSyDUcWbPqedwOKujZrSaX7BBgudbM1g7A58",
  authDomain: "socialmedia-8bff2.firebaseapp.com",
  projectId: "socialmedia-8bff2",
  storageBucket: "socialmedia-8bff2.appspot.com",
  messagingSenderId: "466428215861",
  appId: "1:466428215861:web:338c308f971e0ef427677c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Export functions
export { storage, ref, uploadBytes, getDownloadURL, deleteObject };
