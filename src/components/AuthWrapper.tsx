/* eslint-disable react/no-unescaped-entities */
import { LoginAnimation } from "../constants/files";
import { LogoBrand } from "./LogoBrand";
import Lottie from "./Lottie";

type AuthWrapperProps = {
  children: React.ReactNode;
};
const Auth = ({ children }: AuthWrapperProps) => {
  return (
    <div className="flex flex-row h-screen bg-gray-100">
      <div className="flex-grow w-full flex flex-col items-center py-20 px-5 bg-white">

      <div className=" max-w-[200px] md:max-w-[300px] lg:max-w-[430px] h-full w-full flex flex-col justify-center items-center gap-3">
        <div className=" w-full">
          <LogoBrand />
        </div>

        <div className=" flex-grow flex flex-col items-center gap-3 w-full py-20">
          {children}
        </div>
      </div>
      </div>
      <div className="flex-grow w-full h-full  flex flex-row justify-center items-center">
        <Lottie animationData={LoginAnimation} style="w-3/4" />
      </div>
    </div>
  );
};

export default Auth;
