import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { unstable_getServerSession } from "next-auth";
import { useMemo } from "react";

import Workspace from "../../../components/WorkspaceWrapper";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useTable } from "react-table";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import Table, { TColumns } from "../../../components/MaterialTable/Table";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../server/db/client";
import { trpc } from "../../../utils/trpc";
import { columnsSingleLibelle } from "../../../constants/tableColumns";

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
  } else {
    
    return {
      props: {
        session,
     
      },
    };
  }
};



const Index: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {

  // console.log(data);
  // //var mutation from trpc
  // const mutation = trpc.useMutation("prestation.create");

  // const onAdd = ({ newData, resolve, reject }: any) => {
  //   mutation.mutate(newData);
  //   console.log("error", mutation.error);
  //   console.log("data", mutation.data);
  //   if (mutation.error) {
  //     reject();
  //   } else {
  //     resolve();
  //   }
  // };
  return (
    <Workspace>
      <Table title="Préstation" columns={columnsSingleLibelle} endpoint="prestation" />
    </Workspace>
  );
};

export default Index;
