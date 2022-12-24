import React from 'react';
import ImageGallery from "react-image-gallery";

const ImgSlider = ({ book }) => {
    const { title, post_time, seller_location, images } = book;
    const img = [
      {
        original: `${images[0]}`,
        thumbnail: `${images[0]}`,
      },
      {
        original: `${images[1]}`,
        thumbnail: `${images[1]}`,
      },
      {
        original: `${images[2]}`,
        thumbnail: `${images[2]}`,
      },
    ];
    return (
      <div>
        <div className='lg:w-96 '>
          <ImageGallery cl items={img} />;
        </div>
      </div>
    );
};

export default ImgSlider;