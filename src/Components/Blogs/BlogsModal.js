import React from 'react';

const BlogsModal = ({ setOpen, isOpen, blogData }) => {
  return (
    <div>
      <div className={`modal ${isOpen && "modal-open"}`}>
        <div className="modal-box relative">
          <label
            onClick={() => setOpen(false)}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{blogData?.question}</h3>
          <p className="py-4">
            {blogData?.ans}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogsModal;