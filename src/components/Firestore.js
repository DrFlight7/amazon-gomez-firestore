import db from './db2';
import { useState } from 'react';

const Firestore = () => {
    const [fullName, Setname] = useState("");
    const [phoneNumber, Setnumber] = useState("");
    const [dateofbirth, Setbirth] = useState("");

    const sub = (e) => {
        e.preventDefault();

        // Add data to the store
        db.collection("data").add({
            Fullname: fullName,
            Phonenumber: phoneNumber,
            dateofbirth: dateofbirth
        })
            .then((docRef) => {
                alert("Data Successfully Submitted");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    return (
        <div>
            <center>
                <form style={{ marginTop: "200px" }}
                    onSubmit={(event) => { sub(event) }}>
                    <input type="text" placeholder="your name"
                        onChange={(e) => { Setname(e.target.value) }} />
                    <br /><br />
                    <input type="number" placeholder="your phone number"
                        onChange={(e) => { Setnumber(e.target.value) }} />
                    <br /><br />
                    <input type="text" placeholder="your date of birth"
                        onChange={(e) => { Setbirth(e.target.value) }} />
                    <br /><br />
                    <button type="submit">Submit</button>
                </form>
            </center>
        </div>
    );
}

export default Firestore;