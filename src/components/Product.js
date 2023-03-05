import React from 'react';
import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, code, description, price, availableQuantity, url, partNumber, specification}) {
    const dispatch = useDispatch();
    const urlLink = ""+url+"";

    // Variable to manipulate available items
    let [inventoryCounter, setInventoryCounter] = useState(availableQuantity);

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );

    const [hasPrime] = useState(Math.random() < 0.5);

    const addItemToBasket = () => {

        const product = {
            id,
            price,
            rating,
            description,
            specification,
            availableQuantity,
            hasPrime,
            url
        }

        // Decrementing available quantity
        setInventoryCounter(--inventoryCounter); 

        // Sending the product as an action to the REDUX store... the basket slice
        dispatch(addToBasket(product))
    }

    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{partNumber}</p>

            <img
                src={url} 
                height={200} 
                width={200} 
                objectFit="contain"
            >
            </img>
            {/*
            <Image src={url} height={200} width={200} objectFit="contain" />
            */}

            <h4 className='my-3'>{code}</h4>

            <div className='flex'>
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon className="h-5 text-yellow-500" />
                    ))}
            </div>

            <p className='text-xs my-2 line-clamp-2'>{description}</p>

            <p className='text-xs my-2 line-clamp-2'>Available Quantity: {availableQuantity}</p>
            <p id='availableQuantity' className='text-xs my-2 line-clamp-2'>Quantity after order: {inventoryCounter}</p>
            
            <div className="mb-5">
                <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Php '} renderText={value => <div>{value}</div>} />
            </div>

            {hasPrime && (
                <div className='flex items-center space-x-2 -mt-5'>
                    <img className='w-12' src="https://links.papareact.com/fdw" atl="" />
                    <p className='text-xs text-gray-500'>FREE Next-Day Delivery</p>
                </div>
            )}

            {/* Disable button when available quantity after order is zero or negative. */}
            <button 
                disabled={inventoryCounter===0}
                onClick={addItemToBasket}
                className={`button mt-2 ${inventoryCounter===0 && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {inventoryCounter===0 ? "No items available" : "Add to Basket"}
            
            </button>

        </div>
    );
}

export default Product;