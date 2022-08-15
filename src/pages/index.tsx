import { Button } from "@geist-ui/core";
import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "../components/Head";

import { APP_NAME } from "../constants/global";
import { trpc } from "../utils/trpc";
import { authOptions } from "./api/auth/[...nextauth]";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: true,
      },
    };
  }

  return {
    redirect: {
      destination: "/workspace",
      permanent: true,
    },
  };
};

const Home: NextPage = (props) => {
  
const deleteUser=trpc.useMutation(['user.delete'])
  return (
    <>
      <Head
        title={APP_NAME}
        description="Gestion des appliances"
        icon="/favicon.ico"
      />

      <main>
       {/* <Button onClick={()=>{
        deleteUser.mutate()
       }}>Delete user</Button> */}
      </main>
    </>
  );
};

export default Home;
