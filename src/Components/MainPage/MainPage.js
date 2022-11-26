import React from 'react';
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
            <Footer></Footer>
        </div>
    );
};

export default MainPage;