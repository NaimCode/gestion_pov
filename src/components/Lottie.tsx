import { useLottie } from "lottie-react";

type LottieProps={
    animationData:any
    loop?:boolean
    style?:string
}
const Lottie = ({animationData,loop,style}:LottieProps) => {
    const options = {
      animationData,
      loop
    };
  
    const { View } = useLottie(options);
  
    return <div className={style}>{View}</div>;
  };

    export default Lottie;