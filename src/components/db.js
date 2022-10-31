import firebase from 'firebase';

var firebaseConfig = {
    // Firebase credentials
    apiKey: "AIzaSyAZZ8SepSkMh7u6uJIAjJPTycnv64YJtlA",
    authDomain: "rado-react-firebase.firebaseapp.com",
    databaseURL: "https://rado-react-firebase-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "rado-react-firebase",
    storageBucket: "rado-react-firebase.appspot.com",
    messagingSenderId: "277787332936",
    appId: "1:277787332936:web:475597a2c76de083bfe37d",
    measurementId: "G-8WYDQL0S3W"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
}


export default db;