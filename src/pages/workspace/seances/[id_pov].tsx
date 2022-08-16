/* eslint-disable react-hooks/rules-of-hooks */
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { unstable_getServerSession } from "next-auth";

import Workspace from "../../../components/WorkspaceWrapper";
import { authOptions } from "../../api/auth/[...nextauth]";
import Table, { TColumns } from "../../../components/MaterialTable/Table";
import { AutoComplete, Button, Checkbox, Input, Select } from "@geist-ui/core";
import { trpc } from "../../../utils/trpc";
import { useState } from "react";
import { prisma } from "../../../server/db/client";
import { useRouter } from "next/router";

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
  const id_pov:string = context.query.id_pov as string;
  const pov=await prisma.pov.findFirst({where:{id:id_pov}});
  return {
    props: {
      session,
      id_pov,
      pov,
    },
  };
};

const index: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router=useRouter()
  const readOnly = props.id_pov ? true : false;

  let columnsClient: Array<TColumns> = [
    {
      title: "Résumé",
      field: "resume",
    },
    {
      title: "Date",
      field: "date",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
        minWidth:"200px"
        
      },
      editComponent:(props:any)=>{
      
        return (
          <Input
          htmlType="date"
          value={props.value}
          onChange={(e: any) => props.onChange(e.target.value)}
         
        /> 
        )
      }
    },
    {
      title: "Participants",
      field: "participants",

      render: (rowData: any) => (
        <Button
         onClick={()=>router.push(`/workspace/seances/participants/${rowData.id}`)}
         auto
         scale={3/4}
        >
         voir la liste
        </Button>
      ),

      editComponent: (props: any) => (<span></span>),
    },
    {
      title: "pov",
      field: "pov.libelle",
      // editComponent:(props:any)=>{

      //  return <AutoComplete  value={props.value}  disabled={readOnly}  onSelect={(e: any) => props.onChange(e)} disableFreeSolo options={client.data?.map((t,i)=>({label:t.libelle,value:t.libelle}))} />

      // }
      editComponent: (propsTable: any) => {
        let l = props.pov.libelle;
     
  
        
        return (
          <Select
            disabled={readOnly}
            value={readOnly ? l : propsTable.value}
            placeholder="Choisir un client">
            
              <Select.Option  value={props.pov.libelle}>
                {props.pov.libelle}
              </Select.Option>
          
          </Select>
        );
      },
    },
  ];

  const filter = (data: Array<any>) => {
    return data ? data.filter((t) => t.id_pov == props.id_pov) : [];
  };
  return (
    <Workspace>
      <Table
        title={
       "Séances de " +
           props.pov.libelle
     
        }
        filter={readOnly ? filter : undefined}
        filter_id={props.id_pov}
        columns={columnsClient}
        endpoint="seance"
      />
    </Workspace>
  );
};

export default index;
