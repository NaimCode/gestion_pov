import Image from "next/image"
import { LogoImage } from "../constants/files"
import { APP_NAME } from "../constants/global"


export const Logo = () => {
  return (
   
       <div className="hover:animate-spin ">
         <Image src={LogoImage} alt="logo" height={50} width={50}/>
       </div>
  
  )
}


export const LogoBrand = () => {
    return <div className="flex flex-row gap-2 items-center justify-start w-full">
        <Logo />
          <Brand/>
    </div>
}

export const Brand = () => {
    return <span className="font-logo text-3xl font-extrabold">{APP_NAME}</span>
}