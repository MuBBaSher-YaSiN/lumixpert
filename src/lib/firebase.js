import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBXQWPBHgQulbSXwkORjTXnG-qoU8y2bBw",
    authDomain: "lumixpert-299cb.firebaseapp.com",
    projectId: "lumixpert-299cb",
    storageBucket: "lumixpert-299cb.firebasestorage.app",
    messagingSenderId: "156998720035",
    appId: "1:156998720035:web:21df1933c8a7720e8baf96",
    measurementId: "G-HMTRNMVBVT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)