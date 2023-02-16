import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner"
import ProductFeed from "../components/ProductFeed"
import { getSession } from "next-auth/react";
import { useState } from 'react'

//Testing data from firebase
import { database } from "../components/db2"
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

export default function Home({ products }) {

  const databaseRef = collection(database, 'Product');
  const [fireData, setFireData] = useState([]);

  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) => {
          return { ...data.data(), id: data.id }
        }))
      })
  }

  const displayAtConsole = () => {
    console.log(database);
  }

  return (

    <div className="bg-gray-100">
      <Head>
        <title>Ronie Gomez Foton Howo Spare Parts Supplier</title>
      </Head>
      {/*Header Component*/}
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/*Banner*/}
        <Banner />

        {/*Button to diplay product from firestore*/}
        <button
          onClick={getData}
        >Display Products from Firestore</button>


        <br />
        <div>
          {fireData.map((data) => {
            { data.id }
            { data.partNumber }
            { data.price }
          })}
        </div>


        {/*Product Feed*/}
        <ProductFeed products={products} />

      </main>
    </div>
  );
}



export async function getServerSideProps(context) {
  const session = await getSession(context);



  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );




  return {
    props: {
      products,
      session
    },
  };


}

