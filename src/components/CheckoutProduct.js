import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/outline'
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from "../slices/basketSlice"

function CheckoutProduct({
    id,
    title,
    price,
    rating,
    description,
    category,
    url,
    hasPrime
}) {
    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            url,
            hasPrime
        };

        // Push item(s) into Redux
        dispatch(addToBasket(product));
    }

    const removeItemToBasket = () => {
        // Remove the item from Redux
        dispatch(removeFromBasket({ id }));
    }

    return (
        <div className="grid grid-cols-5">
            

            {/* Middle Section*/}
            <div className="col-span-3 mx-5">
                <img
                    src={url}
                    height={200}
                    width={200}
                    objectFit="contain"
                >
                </img>
                <div className='flex'>
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className="h-5 text-yellow-500" />
                        ))
                    }
                </div>
                <p className='text-xs my-2 line-clamp-3'>{description}</p>
                <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Php '} renderText={value => <div>{value}</div>} />
                {hasPrime && (
                    <div className='flex items-center space-x-2'>
                        
                        <p className='text-xs text-gray-500'>FREE Next-Day Delivery</p>
                    </div>
                )}
            </div>
            {/* Right Add/Remove Button*/}
            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button onClick={addItemToBasket} className='button'>Add to Basket</button>
                <button onClick={removeItemToBasket} className='button'>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct