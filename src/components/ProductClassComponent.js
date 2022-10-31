// Import Firestore database
import db from './db';
import { useState } from 'react';

const ProductClassComponent = () => {

    const [info, setInfo] = useState([]);

    // Start the fetch operation as soon as
    // the page loads

    // This is a fix to window not defined.
    if (typeof window !== "undefined") {
        window.addEventListener('load', () => {
            Fetchdata();
        });
    }



    // Fetch the required data using the get() method
    const Fetchdata = () => {
        db.collection("data").get().then((querySnapshot) => {

            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr, data]);

            });
        })
    }

    // Display the result on the page
    return (
        <div>
            {
                info.map((data) => (
                    <Frame fullName={data.Fullname}
                        phoneNumber={data.Phonenumber}
                        dateOfBirth={data.dateofbirth} />
                ))
            }
        </div>

    );
}

// Define how each display entry will be structured
const Frame = ({ fullName, phoneNumber, dateOfBirth }) => {
    console.log(fullName + " " + phoneNumber + " " + dateOfBirth);
    return (
        <center>
            <div className="relative flex flex-col m-5 bg-white z-30 p-10">

                <p className='absolute top-2 right-2 text-xs italic text-gray-400'>FULL NAME : {fullName}</p>


                <p className='my-3'>PHONE NUMBER : {phoneNumber}</p>


                <p className='text-xs my-2 line-clamp-2'>DATE OF BIRTH : {dateOfBirth}</p>

            </div>
        </center>
    );
}

export default ProductClassComponent;