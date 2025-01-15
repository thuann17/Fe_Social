import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUcWbPqedwOKujZrSaX7BBgudbM1g7A58",
  authDomain: "socialmedia-8bff2.firebaseapp.com",
  projectId: "socialmedia-8bff2",
  storageBucket: "socialmedia-8bff2.appspot.com",
  messagingSenderId: "466428215861",
  appId: "1:466428215861:web:338c308f971e0ef427677c",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const uploadImageToFirebase = async (file) => {
  try {
    const storageRef = ref(storage, `Images/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw error; 
  }
};

const deleteImageFromFirebase = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl); 

    await deleteObject(imageRef);
    console.log("Image deleted successfully!");
  } catch (error) {
    console.error("Error deleting image from Firebase:", error);
  }
};

export { storage, uploadImageToFirebase, deleteImageFromFirebase };
