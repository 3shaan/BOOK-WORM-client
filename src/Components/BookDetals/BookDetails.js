import React, { useState } from 'react';
import { useFetcher, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import Loading from '../Load & Error/Loading';
import BookDesc from './BookDesc';
import BooksInfo from './BooksInfo';
import BuyModal from './BuyModal';
import ImgSlider from './ImgSlider';
import PriceCard from './PriceCard';

const BookDetails = () => {
    const book = useLoaderData();
    const [isOpen, setOpen] = useState(false);
  console.log(book)
  const fetcher = useNavigate();
   const navigation = useNavigation();
   if (navigation.state === "loading") {
     return <Loading></Loading>;
   }
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
        {isOpen && (
          <BuyModal
            fetcher={fetcher}
            isOpen={isOpen}
            setOpen={setOpen}
            book={book}
          ></BuyModal>
        )}
      </div>
    );
};

export default BookDetails;