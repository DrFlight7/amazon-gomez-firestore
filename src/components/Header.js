import React from 'react';
import Image from "next/image";
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';
import { useState, useEffect } from "react";

//importing the function from index
//import {handleChange} from '../pages/index';

import { displayValueFromVariableOutsideComponent } from '../pages';

export let inputValue = "";
export let searchInput = "";
let setSearchInput = "";

function Header() {
    const { data } = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);

    [searchInput, setSearchInput] = useState(''); 

    const handleButtonClick = (event) => {
        inputValue = searchInput;
        //console.log("From the Header Component handleButtonClick: ", inputValue);
        displayValueFromVariableOutsideComponent();
    }

    const handleChange = (event) => {
        setSearchInput(event.target.value);
        //inputValue = searchInput;
        //console.log("This is from handleChange function");
        //console.log("Input value: ", event.target.value);
        //console.log("From the Header.js handleChange inValue: ", inputValue);
        displayValueFromVariableOutsideComponent();
    }
    
    useEffect(() => {
        const inputSearchFunction = document.getElementById("inputSearch");
        inputSearchFunction.addEventListener("change", function(event) {
            handleButtonClick();
        });
    })
    

    return (
        <header>
            {/* Top Nav*/}
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div className='mt-2 flex item-center flex-grow sm:flex-grow-0'>

                    <Image
                        onClick={() => router.push('/')}
                        src="https://www.autoindustriya.com/images/car-logo/Foton-logo.png"
                        //src="http://links.papareact.com/f90"
                        width={150}
                        height={40}
                        objectFit="contain"
                        className='cursor-pointer'
                    />

                </div>

                <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
                    <input 
                        id="inputSearch"
                        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" 
                        type="text"
                        set="Hello" 
                        onChange={(event) => handleChange(event)}
                        //value={"Hello World!"}
                        value={(searchInput)}
                    />
                    <SearchIcon 
                        className="h-12 p-4" 
                        onClick={handleButtonClick}
                    />
                </div>

                {/* Right*/}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    <div onClick={!data ? signIn : signOut} className="link">
                        <p>
                            {data ? `Hello, ${data.user.name}` : "Sign In"}
                        </p>
                        <p className="font-extrabold md:text-sm">Account & Lists</p>
                    </div>
                    <div onClick={() => router.push("/orders")} className="link">
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>
                    <div
                        onClick={() => router.push('/checkout')}
                        className="relative flex items-center link">
                        <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>
                            {items.length}
                        </span>
                        <ShoppingCartIcon className='h-10' />
                        <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
                    </div>
                </div>

            </div>

            {/* Bottom Nav*/}
            <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                <p className="link flex items-center">
                    <MenuIcon className='h-6 mr-1' />
                    All
                </p>
                <p className="link">Sales Management</p>
                <p className="link">Inventory Management</p>
                <p className="link">Sales Returns</p>
                <p className="link hidden lg:inline-flex">Clients</p>
                <p className="link hidden lg:inline-flex">Users</p>
            </div>
        </header>
    )
}

export default Header