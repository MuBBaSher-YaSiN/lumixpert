// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXQWPBHgQulbSXwkORjTXnG-qoU8y2bBw",
    authDomain: "lumixpert-299cb.firebaseapp.com",
    projectId: "lumixpert-299cb",
    storageBucket: "lumixpert-299cb.firebasestorage.app",
    messagingSenderId: "156998720035",
    appId: "1:156998720035:web:21df1933c8a7720e8baf96",
    measurementId: "G-HMTRNMVBVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
// const analytics = getAnalytics(app);