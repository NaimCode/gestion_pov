import { AutoComplete } from "@geist-ui/core";
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { unstable_getServerSession } from "next-auth";
import Table, { TColumns } from "../../../components/MaterialTable/Table";

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

const Index: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const columnsClient: Array<TColumns> = [
    {
      title: "Libellé",
      field: "libelle",
    },

    {
      title: "Activité",
      field: "activite",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
      },
    },
    {
      title: "Secteur",
      field: "secteur",

      render: (rowData: any) => (
        <span
          className={`text-sm px-3 py-2 text-white  rounded-md ${
            rowData.secteur == "privé" ? "bg-blue-600" : "bg-pink-600"
          }`}
        >
          {rowData.secteur}
        </span>
      ),

      editComponent: (props: any) => (
        <AutoComplete
          value={props.value}
          onSelect={(e: any) => props.onChange(e)}
          disableFreeSolo
          initialValue="privé"
          options={[
            { label: "privé", value: "privé" },
            { label: "public", value: "public" },
          ]}
        />
      ),
    },
  ];

  return (
    <Workspace>
      <Table title="Clients" columns={columnsClient} endpoint="client" />
    </Workspace>
  );
};

export default Index;
