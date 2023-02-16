
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
//import { firebase } from 'firebase';
//import { firebase } from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCWL5tfo4AM77Y7qTA-cdff-6acEd-YBTk",
    authDomain: "backend-crud-nextjs-fire-35d8a.firebaseapp.com",
    projectId: "backend-crud-nextjs-firebase",
    storageBucket: "backend-crud-nextjs-firebase.appspot.com",
    messagingSenderId: "816451076577",
    appId: "1:816451076577:web:2fe6c699797318256f92a0"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore();