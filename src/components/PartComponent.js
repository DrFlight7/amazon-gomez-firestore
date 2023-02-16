import { useState } from "react"
import db from "./db";


const PartComponent = () => {

    const [info, setInfo] = useState([]);

    //Start the fetch operation as soon as the page loads

    //This is to fix to window not defined.
    if (typeof window !== "undefined") {
        window.addEventListener('load', () => {
            FetchData();
        });
    }

    //Fetch the required data using the get() method
    const FetchData = () => {
        db.collection("part").get().then((querySnapshot) => {

            //Loop through the data and store it in an array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr, data]);
            });
        })
    }

    //Display the result on the page
    return (
        <div>
            {
                info.map((data) => (
                    <PartFrame
                        partNumber={data.Partnumber}
                        description={data.Description}
                        specification={data.Specification}
                        code={data.Code}
                        unit={data.Unit}
                    />
                ))
            }
        </div>
    );
}

//Define how each display entry will be structured
const PartFrame = ({ partNumber, description, specification, code, unit }) => {
    console.log(partNumber + " " + description + " " + specification);
    return (
        <center>
            <div className="relative flex flex-col m-5 bg-white z-30 p-10">
                <p className='absolute top-2 right-2 text-xs italic text-gray-400'>Code: {code}</p>
                <p className='my-3'>Part Number: {partNumber}</p>
                <p className='my-3'>Description: {description}</p>
                <p className='my-3'>Specification: {specification}</p>
                <p className='text-xs my-2 line-clamp-2'>Unit: {unit}</p>
            </div>
        </center>
    );
}

export default PartComponent;