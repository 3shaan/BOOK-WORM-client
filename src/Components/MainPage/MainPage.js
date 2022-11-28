import React from 'react';
import BestFeatures from '../Extrta/BestFeatures';
import AdvertisedProducts from './AdvertisedProducts';
import Banner from './Banner';
import Footer from './Footer';
import Products from './Products';

const MainPage = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <AdvertisedProducts></AdvertisedProducts>
            <BestFeatures></BestFeatures>
            <Footer></Footer>
        </div>
    );
};

export default MainPage;