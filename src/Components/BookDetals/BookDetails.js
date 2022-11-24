import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookDesc from './BookDesc';
import BooksInfo from './BooksInfo';
import BuyModal from './BuyModal';
import ImgSlider from './ImgSlider';
import PriceCard from './PriceCard';

const BookDetails = () => {
    const book = useLoaderData();
    const [isOpen, setOpen] = useState(false);
    console.log(book)
    return (
      <div className="w-10/12 mx-auto mt-10 bg-gray-100 p-5">
        <div className="flex gap-10">
          <ImgSlider book={book}></ImgSlider>
          <BooksInfo book={book} setOpen={setOpen}></BooksInfo>
          <PriceCard book={book}></PriceCard>
        </div>
        <div className="w-full">
          <BookDesc book={book}></BookDesc>
        </div>
        <BuyModal isOpen={isOpen} setOpen={setOpen}></BuyModal>
      </div>
    );
};

export default BookDetails;