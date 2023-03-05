import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner"
import ProductFeed from "../components/ProductFeed"
import { useEffect, useState } from 'react'
import { firebaseConfig } from '../firebaseConfig'
import {
  collection,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { initializeApp } from "firebase/app";

import { inputValue, searchInput } from "../components/Header";

export let displayValueFromVariableOutsideComponent = "";

export default function Home() {

  
  const [fireData, setFireData] = useState([]);
  
  let databaseRef = null;

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getFirestore(app);
    databaseRef = collection(database, "Product");
    getData();
  }, [])

  //Testing the function called from outside component
  displayValueFromVariableOutsideComponent = () => {
    //setInputValue(inputValue.toLowerCase());
    console.log("From the index.js inputValue: ", inputValue.toLowerCase());
    setQuery(searchInput.toLowerCase());
  }

  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) => {
          return { ...data.data(), id: data.id }
        }))
      })
      //setQuery(inputValue);
  }

  const displayAtConsole = () => {
    console.log(databaseRef);
  }
  
  //This is for the search filter function
  const [query, setQuery] = useState('');

  //This is the search filter function
  const searchFilter = (array) => {
    return array.filter(
      (product) => product.description.toLowerCase().includes(query)
      //(product) => product.description.includes(query)
    )
  }

  //Applying the search filter function to the array of products received from firebase
  const filtered = searchFilter(fireData)

  //Handling the input on the search bar
  const handleChange = (e) => {
    setQuery(inputValue)
  }

  return (
    
    <div className="bg-gray-100">
      <Head>
        <title>Ronie Gomez Foton Howo Spare Parts Supplier</title>
      </Head>
      {/*Header Component*/}
      <Header/>

      <main className="max-w-screen-2xl mx-auto">
        {/*Banner*/}
        <Banner />
        
        <ProductFeed products={fireData} />
      
      {/*Button to diplay product from firestore*/}
        <button
          className="button"
          onClick={getData}
        >Display Products from Firestore</button>

      </main>
    </div>
  );
}
