import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Loading = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center mt-10">
        <PulseLoader color="#36d7b7" size={20} />
      </div>
    </div>
  );
};

export default Loading;
