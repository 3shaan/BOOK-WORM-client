import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigation,  } from 'react-router-dom';
import Loading from '../Load & Error/Loading';
import BooksCard from './BooksCard';

const Category = () => {
   const navigation = useNavigation();
  const books = useLoaderData();

  if (navigation.state === "loading") {
    return <Loading></Loading>;
  }

 
  console.log(books);
    return (
      <div>
        <h1 className='text-2xl text-center font-semibold my-10'>This is {books[0]?.genre} Category</h1>
        <div className='w-10/12 mx-auto grid grid-cols-1 lg:grid-cols-2 lg:py-10'>
          {books.map((book) => (
            <BooksCard key={book._id} book={book}></BooksCard>
          ))}
        </div>
      </div>
    );
};

export default Category;