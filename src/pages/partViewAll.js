import Header from "../components/Header"
import { useSession } from "next-auth/react";
import React, { Fragment, useEffect, useState} from "react";
import { database, firebaseConfig } from '../firebaseConfig'
import {
    collection,
    getDocs, 
    getFirestore,
    doc,
    deleteDoc
  } from 'firebase/firestore';

import {
    SearchIcon
} from "@heroicons/react/outline";
import { initializeApp } from "firebase/app";
import Modal from "../components/Modal";


function PartViewAll() {

    const [idToDelete, setIdToDelete] = useState('');

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    const { data } = useSession();
    const [fireData, setFireData] = useState([]);
    const [queryValue, setQueryValue] = useState('');
    let databaseRef = null;
    //let modal = document.getElementById("popup-modal");
    const ref = React.useRef(null);
    //const spanRef = React.useRef(null);

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const database = getFirestore(app);
        databaseRef = collection(database, "Product");
        getData();

        //for the modal
        //console.log(ref.current);

    })

    const getData = async() => {
        await getDocs(databaseRef)
            .then((response) => {
                setFireData(response.docs.map((data) => {
                    return { ...data.data(), id: data.id}
                }))
            })
    }

    const searchFilter = (array) => {
        return array.filter(
            (product) => product.description.toLowerCase().includes(queryValue)
        )
    }

    const filtered = searchFilter(fireData);

    const deleteRecord = (id) => {
        let fieldToEdit = doc(database, 'Product', id);
        deleteDoc(fieldToEdit)
        .then(() => {
            alert('Record successfuly deleted.')
        })
        .catch((err) => {
            alert('Record cannot be deleteDoc.');
        })
    }

    

    

    return (
        <Fragment>
            <div className="bg-gray-100">
                <Header />
                <main className='max-w-screen-lg mx-auto p-10'>
                    <div>
                        <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>All Foton Products</h1>
                            {data ? (
                                <h2 className="font-bold">Please fill out this form with the required information.</h2>
                            ) : (
                                <h2>Please sign in to view and edit products</h2>
                            )}
                    
                    

                    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                        {/*}
                        <form>   
                            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required/>
                                <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </form>
                        */}
                        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
                            <input 
                                id="inputSearch"
                                className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                type="text"
                                set="Hello"
                                placeholder="Search..." 
                                onChange={(event) => setQueryValue(event.target.value)}
                                value={(queryValue)}
                                //value={}
                            />
                            <SearchIcon 
                                className="h-12 p-4" 
                                //onClick={handleButtonClick}
                            />
                        </div>

                        {/*The modal*/}
                        

                        {/*Table to display the records*/}
                        
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">PartNumber</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Description</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Specification</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Code</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Unit</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Available Quantity</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Price</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Operation</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100 border-t border-gray-100">

                                {/*Populating the tables with data from firebase*/}
                                {filtered.map((data) => {
                                    return (
                                        <tr>
                                            <td scope="col" className="px-6 py-4 font-small text-gray-900">{data.partNumber}</td>
                                            <td scope="col" className="px-6 py-4 font-small text-gray-900">{data.description}</td>
                                            <td scope="col" className="px-6 py-4 font-small text-gray-900">{data.specification}</td>
                                            <td scope="col" className="px-6 py-4 font-small text-gray-900">{data.code}</td>
                                            <td scope="col" className="px-6 py-4 font-small text-gray-900">{data.unit}</td>
                                            <td scope="col" className="px-6 py-4 font-small text-gray-900 text-center">{data.availableQuantity}</td>
                                            <td scope="col" className="px-6 py-4 font-small text-gray-900 text-right">{data.price}</td>
                                            <td class="px-6 py-4 item-center">
                                                <div class="flex justify-end gap-4">
                                                    <a x-data="{ tooltip: 'Delete' }" href="#">
                                                        
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                class="h-6 w-6"
                                                                x-tooltip="tooltip"
                                                                onClick={() => {
                                                                    setShowModalDelete(true);
                                                                    setIdToDelete(data.id);
                                                                }}
                                                                data-modal-target="popup-modal"
                                                                data-modal-toggle="popup-modal"
                                                                //onClick={popup-modal}
                                                                //onClick={() => deleteRecord(data.id)}
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                />
                                                            </svg>
                                                        
                                                    </a>
                                                    <a x-data="{ tooltip: 'Edit' }" href="#">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="h-6 w-6"
                                                        x-tooltip="tooltip"
                                                        onClick={() => setShowModalUpdate(true)}
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                        />
                                                    </svg>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}                                

                                  
                            </tbody>
                        </table>

                        {/*Modal Button*/}

                        

                    </div>
                    
                    {/*Modal for the prompts of every click event [Edit/Delete] */}
                   

                </div>
            </main >


            </div >
            <Modal isVisible={showModalDelete} onClose={() => setShowModalDelete(false)}>
                <button 
                    className="place-items-end"
                    onClick={() => setShowModalDelete(false)}
                >
                    <svg aria-hidden="true" class="w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                <div className="p-6 text-center">
                    <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                    <button className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg test-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={() => {deleteRecord(idToDelete); setShowModalDelete(false);}}>Yes, proceed</button>
                    <button className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => setShowModalDelete(false)}>No, cancel</button>
                </div>
            </Modal>
            <Modal isVisible={showModalUpdate} onClose={() => setShowModalUpdate(false)}>
                
                <form>
                    <div>
                        <fieldset className=''>
                            <label className="form-label inline-block mb-2 text-gray-700" for="part-number">
                                Part Number
                                <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="part-number"
                                    aria-describedby="part-number" 
                                    placeholder="Enter part number"
                                    type=""
                                    onChange={(event) => setPartNumber(event.target.value)}
                                        
                                />
                                <small id="part-number" class="block mt-1 text-xs text-gray-600"></small>
                            </label>
                        </fieldset>
                    </div>
                </form>
                
            </Modal>
                
        </Fragment>
    );
}


export default PartViewAll