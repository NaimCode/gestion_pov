
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

const Index: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const defaultMaterialTheme = createTheme();
  return (
     <Workspace>
     <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Surname', field: 'surname' },
                        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                        { title: 'Birth City', field: 'birthCity', lookup: { 1: 'Linz', 2: 'Vöcklabruck', 3: 'Salzburg' } }
                        ]}
                        data={[
                            { name: 'Max', surname: 'Mustermann', birthYear: 1987, birthCity: 1 },
                            { name: 'Cindy', surname: 'Musterfrau', birthYear: 1995, birthCity: 2 }
                        ]}
                        title="Personen"
                    />
                </ThemeProvider>
     </Workspace>
  );
};

export default Index;
