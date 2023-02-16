import firebase from './firebase';
import React from 'react'
import { useState, useEffect } from 'react';

function SnapshotFirebaseQuery() {

    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(false);
    const ref = firebase.firestore().collection('part');

    //Realtime get function

    function getPart() {
        //setLoading(true);
        ref.where('Description', '===', 'FO OIL FILTER').onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setParts(items);
            //setLoading(false);
        });
    }

    return (
        <div>SnapshotFirebaseQuery</div>
    )
}

export default SnapshotFirebaseQuery