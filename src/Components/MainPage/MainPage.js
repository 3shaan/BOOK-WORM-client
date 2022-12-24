import React from 'react';
import BestFeatures from '../Extrta/BestFeatures';
import WhyBookWorm from '../Extrta/WhyBookWorm';
import AdvertisedProducts from './AdvertisedProducts';
import Banner from './Banner';
import Footer from './Footer';
import Products from './Products';

const MainPage = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyBookWorm></WhyBookWorm>
            <Products></Products>
            <AdvertisedProducts></AdvertisedProducts>
            <BestFeatures></BestFeatures>
            <Footer></Footer>
        </div>
    );
};

export default MainPage;