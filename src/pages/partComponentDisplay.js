import React from 'react';
import PartComponent from '../components/PartComponent';
import Header from '../components/Header';

function PartComponentDisplay() {
    return (
        <div>
            <Header />
            <h1>PartComponentDisplay</h1>
            <PartComponent />
        </div>
    )
}

export default PartComponentDisplay;