import { initializeApp } from "firebase/app";
import { 
    getFirestore,
    collection
 } from "firebase/firestore";
 import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCWL5tfo4AM77Y7qTA-cdff-6acEd-YBTk",
    authDomain: "backend-crud-nextjs-fire-35d8a.firebaseapp.com",
    projectId: "backend-crud-nextjs-firebase",
    storageBucket: "backend-crud-nextjs-firebase.appspot.com",
    messagingSenderId: "816451076577",
    appId: "1:816451076577:web:2fe6c699797318256f92a0"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
//const databaseRef = collection(database, 'Product');
export {database};
export {firebaseConfig};
//export const storage = initializeApp(firebaseConfig).getStorage();
 