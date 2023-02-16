import { useState } from "react"
import Header from "../components/Header";
import db from "../components/db";
import { data } from "autoprefixer";
//import { collection, query, where } from "firebase/firestore";

function partSale(props) {

    const [info, setInfo] = useState([]);

    if (typeof window !== "undefined") {
        window.addEventListener('load', () => {
            FetchData();
        });
    }

    const FetchData = () => {
        db.collection("part").get().then((querySnapshot) => {

            //Loop through the data and store it in an array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr, data]);
            });
        })
    }

    //const [value, setValue] = useState('');
    //const [result, setResult] = useState([]);

    //const part = collection(db, "part");

    //const part = db.collection("part");

    //const q = query(part, where("Description", "==", "FO OIL FILTER"));

    //console.log("q: " + typeof (q));


    //useEffect(() => {
    //    if (value.length > 0) {
    //        fetch(db.collection("part").get()).then(
    //            response => response.json()
    //        ).then(responseData => {
    //            setResult([]);
    //            let searchQuery = value.toLocaleLowerCase();
    //            for (const key in responseData) {
    //               let part = responseData[key].name.toLocaleLowerCase();
    //                if (part.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
    //                   setResult(prevResult => {
    //                        return [...prevResult, responseData[key].name]
    //                    });
    //                }
    //            }

    //console.log("searchQuery: " + typeof (response));

    //        }).catch(error => {
    //            console.log(error);
    //        })



    //    } else {
    //        setResult([]);
    //    }
    //}, [value])



    return (
        <div>

            <p>Search Part</p>
            <input type="text"
                className="form-control block w-half px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                onChange={(event) => setValue(event.target.value)}
                value={value}
            />
            <div>
                {result.map((result, index) => (
                    <a href="#" key={index}>
                        <div>
                            {data.Description}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );

}
export default partSale;