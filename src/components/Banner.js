import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
    return (
        <div className="relative">
            <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20' />
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}
            >
                <div>
                    <img loading="lazy" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIHVmaJ60IsrbeBiboHZMsWLxiS7c1U0LC4g&usqp=CAU" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="https://img.philkotse.com/2020/11/27/KjJYY7r3/ec-genuine-3-day-spare-parts-guarantee-cover-photo-fe92.jpg" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="https://www.foton.com.ph/wp-content/uploads/2021/08/foton17.jpg" alt="" />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner