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
  const pov = trpc.useQuery(["pov.getAll"]);
  const prestation = trpc.useQuery(["prestation.getAll"]);
  const columnsPov: Array<TColumns> = [
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
            placeholder="Choisir un client">
            
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
      cellStyle:{
       
        whiteSpace:"nowrap"
      },

      editComponent: (propsTable: any) => {
       
        return (
          <Select
  
            value={propsTable.value}
            onChange={propsTable.onChange}
            placeholder="Choisir un appliance">
            
            {pov.data?.map((t, i) => (
              <Select.Option key={i} value={t.libelle}>
                {t.libelle}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
  ];

  return (
    <Workspace>
      <Table title="Suivis" columns={columnsPov} endpoint="suivi" />
    </Workspace>
  );
  
};

export default Index;
