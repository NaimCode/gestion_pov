import { Checkbox, Input, Select } from "@geist-ui/core";
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { unstable_getServerSession } from "next-auth";
import Table, { TColumns } from "../../../components/MaterialTable/Table";

import Workspace from "../../../components/WorkspaceWrapper";
import { trpc } from "../../../utils/trpc";
import { authOptions } from "../../api/auth/[...nextauth]";
import { prisma } from '../../../server/db/client';

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
const id_pov=context.query.id_pov as string;


  const pov=await prisma.pov.findFirst({where:{id:id_pov}});
  return {
    props: {
      session,
      id_pov,
      pov
    },
  };
 
};

const Index: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const readOnly = props.id_pov ? true : false;

  const prestation = trpc.useQuery(["prestation.getAll"]);
  const columnsSuivis: Array<TColumns> = [
    {
      title: "Compte rendu",
      field: "compte_rendu",
 
    },

    {
      title: "Montant",
      field: "montant",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
      
      },
    },

    {
      title: "Offre commerciale",
      field: "offre_commerciale",
      align:'center',
      render:(rowData:any)=>{
      
        const text=rowData.offre_commerciale?"En offre":"non offre";
        
        return <span className={`text-sm px-3 py-2 text-white  rounded-md ${rowData.offre_commerciale?"bg-amber-600" :"bg-red-600"}`}>{text}</span>
      },
      editComponent:(props:any)=>{

        return <div className="flex justify-center items-center "><Checkbox scale={2.4} type="warning" checked={props.value} onChange={(e: any) => {
     
          props.onChange(e.target.checked)
        }}/></div>
      }

    }, 
   

    {
      title: "Préstation",
      field: "prestation.libelle",
      cellStyle:{
        whiteSpace:"nowrap"
      },

      editComponent: (propsTable: any) => {
       
        return (
          <Select
          onChange={propsTable.onChange}
            value={propsTable.value}
            placeholder="Choisir une préstation">
            
            {prestation.data?.map((t, i) => (
              <Select.Option key={i} value={t.libelle}>
                {t.libelle}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
        title: "POV",
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
              placeholder="Choisir un pov">
              
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
       "Suivi de " +
           props.pov.libelle
     
        }
        limit={1}
        filter={readOnly ? filter : undefined}
        filter_id={props.id_pov}
        columns={columnsSuivis}
        endpoint="suivi"
      />
    </Workspace>
  );
};

export default Index;
