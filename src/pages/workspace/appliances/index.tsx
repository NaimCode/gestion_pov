import {
    GetServerSideProps,
    NextPage,
    InferGetServerSidePropsType,
  } from "next";
  import { unstable_getServerSession } from "next-auth";
  
  import Workspace from "../../../components/WorkspaceWrapper";
  import { authOptions } from "../../api/auth/[...nextauth]";
import Table, { TColumns } from '../../../components/MaterialTable/Table';
import { AutoComplete, Checkbox } from "@geist-ui/core";
import { trpc } from "../../../utils/trpc";
import { useState } from "react";

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
  
  const index: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const type=trpc.useQuery(['type.getAll'])
    const columnsApplicances: Array<TColumns> = [
      {
        title: "Libellé",
        field: "libelle",
    
      },
      {
          title: "DBID",
          field: "dbid",
          cellStyle:{
            opacity:'70%',
            fontSize:"14px"
          }
        },
      {
          title: "Référence",
          field: "reference",
          cellStyle:{
            opacity:'70%',
            fontSize:"14px"
          }
        },
        {
          title: "Disponibilité",
          field: "disponibilite",
          align:'center',
          render:(rowData:any)=>{
            console.log(rowData);
            const text=rowData.disponibilite?"disponible":"indisponible"
            
            return <span className={`text-sm px-3 py-2 text-white  rounded-md ${rowData.disponibilite?"bg-amber-600" :"bg-red-600"}`}>{text}</span>
          },
          editComponent:(props:any)=>{

            return <div className="flex justify-center items-center "><Checkbox scale={2.4} type="warning" checked={props.value} onChange={(e: any) => {
         
              props.onChange(e.target.checked)
            }}/></div>
          }
 
        }, 
        {
          title: "Type",
          field: "type.libelle",
          editComponent:(props:any)=>{

           return <AutoComplete value={props.value}  onSelect={(e: any) => props.onChange(e)} disableFreeSolo options={type.data?.map((t,i)=>({label:t.libelle,value:t.libelle}))} />
            
          }
        }, 
    ];

    return (
   
         <Workspace>
         <Table title="Préstation" columns={columnsApplicances} endpoint="appliance" />
       </Workspace>
    
    );
  };
  
  export default index;
  
