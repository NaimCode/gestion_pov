import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { unstable_getServerSession } from "next-auth";

import Workspace from "../../../components/WorkspaceWrapper";
import { authOptions } from "../../api/auth/[...nextauth]";
import Table, { TColumns } from "../../../components/MaterialTable/Table";
import { AutoComplete, Checkbox, Select } from "@geist-ui/core";
import { trpc } from "../../../utils/trpc";
import { useState } from "react";
import { prisma } from "../../../server/db/client";

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
  console.log(context.query);
  const id_client = context.query.id_client;

  return {
    props: {
      session,
      id_client,
    },
  };
};

const index: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const client = trpc.useQuery(["client.getAll"]);
  const readOnly = props.id_client ? true : false;

  let columnsClient: Array<TColumns> = [
    {
      title: "Nom",
      field: "nom",
    },
    {
      title: "Prénom",
      field: "prenom",
    },
    {
      title: "Téléphone",
      field: "telephone",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
      },
    },
    {
      title: "Email",
      field: "email",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
      },
    },
    {
      title: "Fonction",
      field: "fonction",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
      },
    },

    {
      title: "Client",
      field: "client.libelle",
      // editComponent:(props:any)=>{

      //  return <AutoComplete  value={props.value}  disabled={readOnly}  onSelect={(e: any) => props.onChange(e)} disableFreeSolo options={client.data?.map((t,i)=>({label:t.libelle,value:t.libelle}))} />

      // }
      editComponent: (propsTable: any) => {
        let l = client.data?.filter((f) => f.id == props.id_client)[0]?.libelle;
     
  
        
        return (
          <Select
            disabled={readOnly}
            value={readOnly ? l : propsTable.value}
            placeholder="Choisir un client">
            {client.data?.map((t, i) => (
              <Select.Option key={i} value={t.libelle}>
                {t.libelle}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
  ];

  const filter = (data: Array<any>) => {
    return data ? data.filter((t) => t.id_client == props.id_client) : [];
  };
  return (
    <Workspace>
      <Table
        title={
       "Contacts du client " +
           client?.data?.filter((f) => f.id == props.id_client)[0]?.libelle
     
        }
        filter={readOnly ? filter : undefined}
        filter_id={props.id_client}
        columns={columnsClient}
        endpoint="contact"
      />
    </Workspace>
  );
};

export default index;
