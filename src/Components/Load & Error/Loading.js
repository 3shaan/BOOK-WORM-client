import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <PulseLoader color="#36d7b7" size={20} />
    </div>
  );
};

export default Loading;
