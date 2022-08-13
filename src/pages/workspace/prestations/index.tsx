
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { unstable_getServerSession } from "next-auth";
import { useMemo } from "react";

import Workspace from "../../../components/WorkspaceWrapper";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useTable } from 'react-table';
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import Table, { TColumns } from "../../../components/MaterialTable/Table";

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

const columns:Array<TColumns>=[{
  title:"Libellé",
  field:"libelle",

}]

const Index: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
const data=[{
  libelle:"hey"},
  {
    libelle:"heydd"}
]
  return (
     <Workspace>
      <Table title="Préstation" columns={columns} data={data}/>
     </Workspace>
  );
};

export default Index;
