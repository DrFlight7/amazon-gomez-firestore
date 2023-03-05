import React from 'react'
import Product from "../components/Product";
//import ProductClassComponent from '../components/ProductClassComponent';
//import Firestore from './Firestore';

function ProductFeed({ products }) {
    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
            {products.slice(0, 4).map(({ id, partNumber, code, price, description, specification, availableQuantity, url}) => (
                <Product
                    key={id}
                    id={id}
                    partNumber={partNumber}
                    price={parseFloat(price)}
                    code={code}
                    description={description}
                    specification={specification}
                    availableQuantity={availableQuantity}
                    url={url}
                />
            ))}

            <img className='md:col-span-full mx-auto' src="https://links.papareact.com/dyz" alt="" />

            <div className='md:col-span-2'>
                {products.slice(4, 5).map(({ id, title, price, description, specification, availableQuantity}) => (
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        specification={specification}
                        availableQuantity={availableQuantity}
                    />
                ))}
            </div>


            {products.slice(5, products.length).map(({ id, title, price, description, specification, availableQuantity}) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    specification={specification}
                    availableQuantity={availableQuantity} 
                />
            ))}
        </div>
    );
}

export default ProductFeed