import { useState } from "react"
import { useSession } from "next-auth/react";
import Header from '../components/Header'
import db from "../components/db2";

export default function AddPartToFirestore() {



    return (
        <div>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <div>
                    <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Part Information Form</h1>
                    {data ? (
                        <h2 className="font-bold">Please fill out this form with the required information.</h2>
                    ) : (
                        <h2>Please sign in to see your orders</h2>
                    )}

                    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-screen-sm mt-5 mx-auto ">
                        <form name="add-part-form" onSubmit={(event) => { sub(event) }}>
                            <div>
                                <fieldset className=''>
                                    <label className="form-label inline-block mb-2 text-gray-700" for="part-number">
                                        Part Number
                                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none max-w-sm"
                                            id="part-number"
                                            aria-describedby="part-number" placeholder="Enter part number"
                                            onChange={(e) => { Setpartnumber(e.target.value) }}
                                            type="text"
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
                                            aria-describedby="description" placeholder="Enter description"
                                            onChange={(e) => { Setdescription(e.target.value) }}
                                            type="text"
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
                                            aria-describedby="specification" placeholder="Enter specification"
                                            onChange={(e) => { Setspecification(e.target.value) }}
                                            type="text"
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
                                            aria-describedby="code" placeholder="Enter code"
                                            onChange={(e) => { Setcode(e.target.value) }}
                                            type="text"
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
                                            aria-describedby="code" placeholder="Enter unit"
                                            onChange={(e) => { Setunit(e.target.value) }}
                                            type="text"
                                        />
                                        <small id="unit" class="block mt-1 text-xs text-gray-600"></small>
                                    </label>
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className=''>
                                    <label className="form-label inline-block mb-2 text-gray-700" for="quantity">
                                        Quantity
                                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="quantity"
                                            aria-describedby="quantity" placeholder="Enter quantity"
                                            onChange={(e) => { Setquantity(e.target.value) }}
                                            type="number"
                                        />
                                        <small id="unit" class="block mt-1 text-xs text-gray-600"></small>
                                    </label>
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className=''>
                                    <label className="form-label inline-block mb-2 text-gray-700" for="price">
                                        Price
                                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="price"
                                            aria-describedby="price" placeholder="Enter price"
                                            onChange={(e) => { Setprice(e.target.value) }}
                                            type="float"
                                        />
                                        <small id="unit" class="block mt-1 text-xs text-gray-600"></small>
                                    </label>
                                </fieldset>
                            </div>

                            <button onclick="submitForm()" type="submit" class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                Add part information
                            </button>
                        </form>
                    </div>
                </div>
            </main >
        </div >

    )
}

