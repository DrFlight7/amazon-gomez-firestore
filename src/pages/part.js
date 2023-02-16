import React from 'react'
import Header from '../components/Header'
import { useSession } from "next-auth/react";

function Part() {
    const { data } = useSession();
    return (
        <div className="bg-gray-100">
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
                        <form>
                            <div>
                                <fieldset className=''>
                                    <label className="form-label inline-block mb-2 text-gray-700" for="part-number">
                                        Part Number
                                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="part-number"
                                            aria-describedby="part-number" placeholder="Enter part number"
                                            type=""
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
                                            aria-describedby="description" placeholder="Enter description" />
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
                                            aria-describedby="specification" placeholder="Enter specification" />
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
                                            aria-describedby="code" placeholder="Enter code" />
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
                                            aria-describedby="code" placeholder="Enter unit" />
                                        <small id="unit" class="block mt-1 text-xs text-gray-600"></small>
                                    </label>
                                </fieldset>
                            </div>

                            <button type="submit" class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                Add part information
                            </button>
                        </form>
                    </div>
                </div>
            </main >

            <div>

            </div>

        </div >
    )
}

export default Part