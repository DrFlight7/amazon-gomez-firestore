import React, { useEffect } from 'react'
import Image from 'next/image';
import Header from '../components/Header'
import { useSession } from "next-auth/react";
import { useState} from "react";
import { storage, uploadBytesResumable } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//Testing storage from firebase storage
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";


import { v4 } from "uuid";

import { database } from '../firebaseConfig'
import {
    collection,
    addDoc
} from 'firebase/firestore';

function Part() {
    const { data } = useSession();

    {/** This is for the image upload of products*/}
    
    const [url, setUrl] = useState(null);
    const [showElements, setShowElements] = useState(false);
    const databaseReference = collection(database, 'Product');

    {/** This is for the image upload of products*/}
    const [partNumber, setPartNumber] = useState(null);
    const [description, setDescription] = useState(null);
    const [specification, setSpecification] = useState(null);
    const [code, setCode] = useState(null);
    const [unit, setUnit] = useState(null);
    const [availableQuantity, setAvailableQuantity] = useState(null);
    const [price, setPrice] = useState(null);
    const [image, setImage] = useState("/path/to/image.jpg");


    const showElementsFunction = () => {
        setShowElements(true);
    }

    
    

    useEffect(() => {

        const app = initializeApp(firebaseConfig);
        storage = getStorage(app);
        console.log("app: ", app);
        console.log("storage in useEffect: ", storage);

        

    }) 
    
    

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };
    

    const handleSubmit = async () => {
        const imageRef = ref(storage, "image");

        await uploadBytes(imageRef, image).then(() => {
                //alert(imageRef);
                getDownloadURL(imageRef)
                    .then((url) => {
                        //console.log("Inside getDownloadURL", url);
                        setUrl(url);
                        //console.log("Inside getDownloadURL", imageRef);
                    })
                    .catch((error) => {
                        console.log(error.message, " : error getting the image url");
                    });
                    setUrl(null);
        })
        .catch((error) => {
            console.log(error.message);
        });

        alert("The getDownloadURL: ", url);
        console.log("The getDownloadURL: ", url);
    };

    const handleSubmit2 = () => {
        let filename='123'+Date.now();
        const imageRef = ref(storage, "images"+filename);

        //console.log(image.fileName);
        //alert(image.fileName);

        imageRef.put(image)
            .then(snapshot => {
                return imageRef.getDownloadURL()
                .then(url => {
                    setUrl(url);
                    console.log("The url from handleSubmit2: ", url);
                    alert("The url from handleSubmit2: ", url);
                })
                .catch((error) => {
                    console.log(error.message, " : error getting the image url");
                })
        })
        .catch(error => {
            console.log("Error from the url from handleSubmit2: ", error)
        })     
        console.log("The url from handleSubmit2: ", url);
        alert("The url from handleSubmit2: ", url);   
    };
    
    const handleSubmit3 = () => {
        if (image == null) return;
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImage(url);
            });
        });   
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //Get a reference to the Firebase Storage bucket
        const storageRef = ref(storage, "image");
        //const storageRef = storage.ref();

        //Generate a unique file name for the uploaded image
        const fileId = image;
        const fileName = `${fileId}.jpg`;

        //Create a reference to the file in the Firebase Storage bucket
        //const fileRef = storageRef.child(`images/${fileName}`);
        
        //Upload the file to the Firebase Storage bucket
        //const snapshot = await fileRef.put(image);
        //const snapshot = await storageRef.put(image);
        //const snapshot = await uploadBytes(storageRef, fileName);
        await uploadBytes(storageRef, fileName).then(() => {
            getDownloadURL(storageRef).then((URL) =>{
                setUrl(URL);
                console.log(url);
                alert(url);
            })
        })

        //Get the download URL of the uploaded file
        //const downloadURL = await snapshot.ref.getDownloadURL();

        //console.log("downloadURL: ", downloadURL);
        //alert("downloadURL: ", downloadURL);

    }

    const handleFormSubmit2 = () => {
        let filename="123"+Date.now();

        //Meta data is required to get downloadURL link?
        const metadata = {
            contentType: 'image/jpeg'
        };

        const storageRef = ref(storage, 'images'+filename);
        const uploadTask = uploadBytesResumable(storageRef, image, metadata);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch(snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch(error.code) {
                    case 'storage/unauthorized':
                        console.log('User does not have permission to access file.');
                        break;
                    case 'storage/canceled':
                        console.log('User canceled the upload.');
                        break;
                    case 'storage/unknown':
                        console.log("Unknown error occurred, inspect error.serverResponse");
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    alert('File available at', downloadURL);
                    alert(typeof downloadURL);
                    console.log('File available at', downloadURL);
                    setUrl(downloadURL);
                    showElementsFunction();
                    addProduct();
                    //console.log("Link at getDownloadURL: ",downloadURL);
                    //alert("Link at getDownloadURL: ",downloadURL);
                    //setUrl(downloadURL);
                    //console.log("Link at getDownloadURL: ",downloadURL);
                    //alert('File available at: ', downloadURL);
                });
            }
            );
            //alert("Link at handleFormSubmit2: ",link);
            //console.log("Link at handleFormSubmit2: ",link);
    }

    const addProduct = () => {
        addDoc(databaseReference, {
            partNumber: partNumber,
            description: description,
            specification: specification,
            code: code,
            unit: unit,
            availableQuantity: Number(availableQuantity),
            price: (price),
            url: url
        })
        .then(() => {
            alert("The information was saved successfully.");
        })
        .catch((err) => {
            console.log.apply(err);
        })
    }

    return (
        <div className="bg-gray-100">
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <div>
                    <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Part Information Form</h1>
                    {data ? (
                        <h2 className="font-bold">Please fill out this form with the required information.</h2>
                    ) : (
                        <h2>Please sign in to add product information</h2>
                    )}

                    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-screen-sm mt-5 mx-auto ">
                        <form>
                            <div>
                                <fieldset className=''>
                                    <label className="form-label inline-block mb-2 text-gray-700" for="part-number">
                                        Part Number
                                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="part-number"
                                            aria-describedby="part-number" placeholder="Enter part number"
                                            type=""
                                            onChange={(event) => setPartNumber(event.target.value)}
                                            value={(partNumber)}
                                        />
                                        <small id="part-number" class="block mt-1 text-xs text-gray-600"></small>
                                    </label>
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className=''>
                                    <label className="form-label inline-block mb-2 text-gray-700" for="description">
                                        Description
                                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="description"
                                            aria-describedby="description" 
                                            placeholder="Enter description" 
                                            onChange={(event) => setDescription(event.target.value)}
                                            value={(description)}
                                        />
                                        <small id="description" class="block mt-1 text-xs text-gray-600"></small>
                                    </label>
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className=''>
                                    <label className="form-label inline-block mb-2 text-gray-700" for="specification">
                                        Specification
                                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="specification"
                                            aria-describedby="specification" 
                                            placeholder="Enter specification"
                                            onChange={(event) => setSpecification(event.target.value)}
                                            value={(specification)} 
                                        />
                                        <small id="specification" class="block mt-1 text-xs text-gray-600"></small>
                                    </label>
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className=''>
                                    <label className="form-label inline-block mb-2 text-gray-700" for="code">
                                        Code
                                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="code"
                                            aria-describedby="code" 
                                            placeholder="Enter code" 
                                            onChange={(event) => setCode(event.target.value)}
                                            value={(code)}
                                        />
                                        <small id="code" class="block mt-1 text-xs text-gray-600"></small>
                                    </label>
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className=''>
                                    <label className="form-label inline-block mb-2 text-gray-700" for="unit">
                                        Unit
                                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="unit"
                                            aria-describedby="code" 
                                            placeholder="Enter unit" 
                                            onChange={(event) => setUnit(event.target.value)}
                                            value={(unit)}
                                        />
                                        <small id="unit" class="block mt-1 text-xs text-gray-600"></small>
                                    </label>
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className=''>
                                    <label className="form-label inline-block mb-2 text-gray-700" for="unit">
                                        Available Quantity
                                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="unit"
                                            aria-describedby="code" 
                                            placeholder="Enter available quantity" 
                                            onChange={(event) => setAvailableQuantity(event.target.value)}
                                            value={(availableQuantity)}
                                        />
                                        <small id="unit" class="block mt-1 text-xs text-gray-600"></small>
                                    </label>
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className=''>
                                    <label className="form-label inline-block mb-2 text-gray-700" for="unit">
                                        Price
                                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="unit"
                                            aria-describedby="code" 
                                            placeholder="Enter product price" 
                                            onChange={(event) => setPrice(event.target.value)}
                                            value={(price)}
                                        />
                                        <small id="unit" class="block mt-1 text-xs text-gray-600"></small>
                                    </label>
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className=''>
                                    <label className="form-label inline-block mb-2 text-gray-700" for="unit">
                                        Upload Image
                                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            type="file"
                                            onChange={handleImageChange}
                                        />
                                        <small id="unit" class="block mt-1 text-xs text-gray-600"></small>
                                    </label>
                                </fieldset>
                            </div>

                           
                            <div>
                                {
                                    showElements && (
                                        <Image
                                            alt={'Product Image'}
                                            src={url}
                                            width={200}
                                            height={200}
                                        />
                                    )
                                }
                                
                            </div>

                            
                        </form>
                         {/* Displaying the product image when uploaded*/}
                         <button id="upload" class="button"
                                onClick={handleFormSubmit2}
                            >
                                Upload Image
                            </button>

                            <button class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={addProduct}
                            >
                                Add part information
                            </button>
                    </div>
                </div>
            </main >
            <div>

            </div>
        </div >
    )
}

export default Part