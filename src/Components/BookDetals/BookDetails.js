import React, { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Navigate, useFetcher, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { authContext } from '../../Context/Context';
import Loading from '../Load & Error/Loading';
import BookDesc from './BookDesc';
import BooksInfo from './BooksInfo';
import BuyModal from './BuyModal';
import ImgSlider from './ImgSlider';
import PriceCard from './PriceCard';

const BookDetails = () => {
    const book = useLoaderData();
    const [isOpen, setOpen] = useState(false);
  // console.log(book)
  const { user } = useContext(authContext);
  const fetcher = useNavigate();
  const navigation = useNavigation();
   if (navigation.state === "loading") {
     return <Loading></Loading>;
  }
  const openBuyModal = () => {
    
    if (!user?.uid) {
      
      toast.error('Please Login to Buy Products')
      return fetcher("/login");
    }
    console.log("first");
    setOpen(true);
  }
    return (
      <div className="w-11/12 lg:w-10/12 mx-auto mt-10  p-5">
        <div className="flex flex-col lg:flex-row gap-10">
          <ImgSlider book={book}></ImgSlider>
          <BooksInfo book={book} setOpen={openBuyModal}></BooksInfo>
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