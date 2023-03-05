import Image from "next/image";

function DisplayImage({src}) {

    <Image 
        src={src} 
        height={200} 
        width={200} 
        objectFit="contain" 
    />

}

export default DisplayImage;