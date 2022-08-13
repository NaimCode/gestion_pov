import { Button, Avatar } from "@geist-ui/core";
import { NextPage, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import { ReactNode } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
import { workspaceMenu } from "../constants/data";
import { getServerSideProps } from "../pages/workspace";
import Divider from "./Divider";
import Head from "./Head";
import { LogoBrand } from "./LogoBrand";

const Workspace:NextPage<{children:ReactNode}> = ({children}:{children:ReactNode}) => {
    //useSession
    const { data: session } = useSession();
    const user = session?.user!;
    const router=useRouter();
  
    return (
      <main className="relative flex flex-row   h-screen">
        <Head title={user.name!} description={`Mon workspace`} />
  
        <div className="w-[230px] h-full  border-r-[1px] border-gray-200 flex flex-col items-center">
          <div className=" h-[70px] flex justify-center items-center w-full border-b-[1px] border-gray-200">
            <div className="scale-75">
              <LogoBrand />
            </div>
        
          </div>
  
           <div className="flex flex-col gap-2 w-full p-3">
         {workspaceMenu.map((item,index) => {
  
          const isCurrent=item.route==router.pathname //=="/workspace": router.pathname.includes(item.route);        
          return (
  
            <>
             <button onClick={()=>router.push(item.route, undefined,{ shallow: true })} key={index} className={`cursor-pointer duration-500 opacity-60 hover:opacity-100 font-semibold flex flex-row items-center gap-2 px-2 py-1 ${isCurrent&&"bg-[#934b97] text-white opacity-100"} hover:bg-[#934b97] hover:text-white translation-all rounded-md`}>
               <div className="text-lg">
               {item.icon}
                 </div>  <span>{item.name}</span>
             </button>
             {item.divider && <Divider />}
            </>
          )
         })}
           </div>
            </div>
     
        <div className="flex-grow relative">
          <NavBarWorkpace session={session} />
          <div className="w-full">
           {children}
          </div>
        </div>
      </main>
    );
  };
  
  export default Workspace;

  const NavBarWorkpace = ({ session }: { session: any }) => {
    const user = session?.user!;
    return (
      <section className="h-[70px] border-b-[1px] border-gray-200 w-full bg-white sticky top-0 left-0 z-10">
        <div className="px-3 h-full flex flex-row justify-between items-center gap-2">
          <div className="flex-grow"></div>
          <Button
            iconRight={<RiSearch2Line />}
            auto
            scale={0.8}
            className="focus:border-none"
          />
          <Button
            iconRight={<AiOutlineSetting />}
            auto
            scale={0.8}
            className="focus:border-none"
          />
          <div className="h-[25px] w-[1px] bg-gray-300"></div>
          <Avatar scale={1.7} src={user.image!} isSquare text={user.name![0]} />
          {/* <Button onClick={() => signOut()} auto>
          Sign out
        </Button> */}
        </div>
      </section>
    );
  };