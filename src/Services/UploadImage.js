// // src/Services/UploadImage.js
// import React, { useState } from 'react';
// import { storage, ref, uploadBytes, getDownloadURL, deleteObject } from './firebase';  // Import necessary functions

// function UploadImage() {
//     const [image, setImage] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const [imageUrl, setImageUrl] = useState("");
//     const [imageName, setImageName] = useState("");  // Store the name of the uploaded image for deletion

//     // Handle file selection
//     const handleImageChange = (e) => {
//         if (e.target.files[0]) {
//             setImage(e.target.files[0]);
//         }
//     };

//     // Handle file upload
//     const handleUpload = () => {
//         if (!image) {
//             alert("Please select an image to upload");
//             return;
//         }
//         setUploading(true);
//         // Create a reference to the Firebase Storage location
//         const storageRef = ref(storage, `Images/${image.name}`);  // Use the modular `ref` function

//         // Upload the image
//         uploadBytes(storageRef, image).then((snapshot) => {
//             console.log("Uploaded a blob or file!", snapshot);

//             // Get the download URL after the upload completes
//             getDownloadURL(snapshot.ref).then((downloadURL) => {
//                 setUploading(false);
//                 setImageUrl(downloadURL); // Set the image URL to state
//                 setImageName(image.name); // Store image name for deletion later
//                 console.log("File available at", downloadURL);
//             }).catch((error) => {
//                 console.error("Error getting download URL:", error);
//                 setUploading(false);
//             });
//         }).catch((error) => {
//             console.error("Upload failed:", error);
//             setUploading(false);
//         });
//     };

//     // Handle image deletion
//     const handleDelete = () => {
//         if (!imageName) {
//             alert("No image to delete");
//             return;
//         }

//         // Get a reference to the file to delete
//         const imageRef = ref(storage, `Images/${imageName}`);

//         // Delete the file
//         deleteObject(imageRef).then(() => {
//             console.log("Image deleted successfully!");
//             setImageUrl("");  // Clear the URL from the state
//             setImageName("");  // Clear the image name from the state
//         }).catch((error) => {
//             console.error("Error deleting image:", error);
//         });
//     };

//     return (
//         <div>
//             <h2>Upload and Delete Image from Firebase Storage</h2>
//             <input type="file" onChange={handleImageChange} />
//             <button onClick={handleUpload} disabled={uploading}>
//                 {uploading ? "Uploading..." : "Upload"}
//             </button>

//             {imageUrl && (
//                 <div>
//                     <h3>Uploaded Image</h3>
//                     <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
//                     <button onClick={handleDelete} style={{ marginTop: '10px' }}>
//                         Delete Image
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default UploadImage;
