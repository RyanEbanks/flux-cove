import React from 'react';
import hero from '../images/Banner-Hero.webp';
// import heroRight from '../images/banner-right.png';
import '../index.css';


function Home() {
    return (
        <div data-testid='homeId' className='flex grow h-1/4'>
            <img
                src={hero}
                alt='hero banner'
                className='object-cover'
            />
            </div>
    );

}

export default Home;
