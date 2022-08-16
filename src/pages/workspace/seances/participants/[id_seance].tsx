import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { unstable_getServerSession } from "next-auth";

import Workspace from "../../../../components/WorkspaceWrapper";
import { authOptions } from "../../../api/auth/[...nextauth]";
import Table, { TColumns } from "../../../../components/MaterialTable/Table";
import { AutoComplete, Checkbox, Input, Select } from "@geist-ui/core";
import { trpc } from "../../../../utils/trpc";
import { useState } from "react";
import { prisma } from "../../../../server/db/client";

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
  const id_seance:string = context.query.id_seance as string;
  const seance=await prisma.seance.findFirst({where:{id:id_seance}});
  return {
    props: {
      session,
      id_seance,
      seance,
    },
  };
};

const index: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {

  const readOnly = props.id_seance ? true : false;

  let columnsClient: Array<TColumns> = [
    {
      title: "Nom",
      field: "nom",
    },
    {
      title: "Prénom",
      field: "prenom",
    },
    
   
  ];

  const filter = (data: Array<any>) => {
    return data ? data.filter((t) => t.id_seance == props.id_seance) : [];
  };
  return (
    <Workspace>
      <Table
        title={
       "Particiant de " +
           props.seance.libelle
     
        }
        filter={readOnly ? filter : undefined}
        filter_id={props.id_seance}
        columns={columnsClient}
        endpoint="participant"
      />
    </Workspace>
  );
};

export default index;
