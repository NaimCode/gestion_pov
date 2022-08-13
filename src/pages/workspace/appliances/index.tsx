import {
    GetServerSideProps,
    NextPage,
    InferGetServerSidePropsType,
  } from "next";
  import { unstable_getServerSession } from "next-auth";
  
  import Workspace from "../../../components/WorkspaceWrapper";
  import { authOptions } from "../../api/auth/[...nextauth]";
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
      props: {
        session,
      },
    };
  };
  
  const index: NextPage = (props) => {
  
  
    return (
      <section>
         <Workspace>
        <span>Appliance</span>
       </Workspace>
      </section>
    );
  };
  
  export default index;
  