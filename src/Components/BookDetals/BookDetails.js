import React from 'react';
import { useLoaderData } from 'react-router-dom';
import BookDesc from './BookDesc';
import BooksInfo from './BooksInfo';
import ImgSlider from './ImgSlider';
import PriceCard from './PriceCard';

const BookDetails = () => {
    const book = useLoaderData();
    console.log(book)
    return (
        <div className='w-10/12 mx-auto mt-10 bg-gray-100 p-5'>
            <div className='flex gap-10'>
                <ImgSlider book={book}></ImgSlider>
                <BooksInfo book={book}></BooksInfo>
                <PriceCard book={book}></PriceCard>
            </div>
            <div className='w-full'>
                <BookDesc book={book}></BookDesc>
            </div>
        </div>
    );
};

export default BookDetails;