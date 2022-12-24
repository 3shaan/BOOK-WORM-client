import Lottie from "react-lottie";
import ani from '../../images/animation.json'

const DashBoardMainContent = () => {
  
  
   const defaultOptions = {
     loop: true,
     autoplay: true,
     animationData: ani,
     rendererSettings: {
       preserveAspectRatio: "xMidYMid slice",
     },
   };
    return (
      <div>
        <div className="max-h-screen w-full">
          <Lottie options={defaultOptions} height={700}></Lottie>
        </div>
      </div>
    );
};

export default DashBoardMainContent;