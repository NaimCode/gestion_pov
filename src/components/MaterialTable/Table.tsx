
import MaterialTable from "material-table";
import { tableIcons } from "./Icons";
import { TableComponents } from './Components';
import { trpc } from "../../utils/trpc";
import { useState } from "react";

export type TColumns = {
  title: string;
  field: string;
  cellStyle?: Object;

  
};
type TableProps = {
  columns: Array<TColumns>;
  title: string;
  portrait?: boolean;
  endpoint:string
};
const Table = ({ columns, title, portrait,endpoint }: TableProps) => {
  const afterEffectHandler = {
    onSuccess: () => {
      query.refetch();
    },
    onError: (data:any) => {
      console.log(data);
      //call notification

      
    }
  }
  const query = trpc.useQuery([(endpoint+".getAll") as any]);
  const mutationCreate=trpc.useMutation([(endpoint+".create") as any],afterEffectHandler);
  const mutationUpdate=trpc.useMutation([(endpoint+".update") as any],afterEffectHandler);
  const mutationDelete=trpc.useMutation([(endpoint+".delete") as any],afterEffectHandler);
 
  const onAdd =async ({ newData, resolve, reject }: any) => {
   mutationCreate.mutate(newData)
    if (mutationCreate.error) {
      reject();
    } else {
      await query.refetch();
      resolve();
    }
  };
  const onDelete =async ({ newData, resolve, reject }: any) => {
    mutationDelete.mutate({id:newData.id})
     if (mutationDelete.error) {
       reject();
     } else {
       await query.refetch();
       resolve();
     }
   };
   const onUpdate =async ({ newData, resolve, reject }: any) => {
    mutationUpdate.mutate(newData)
     if (mutationUpdate.error) {
       reject();
     } else {
       await query.refetch();
       resolve();
     }
   };
  return (
    <div className="py-5 px-5">
      <MaterialTable
        isLoading={query.isLoading || mutationCreate.isLoading || mutationUpdate.isLoading || mutationDelete.isLoading}
        columns={columns}
        data={query.data as any}
        title={title}
        components={TableComponents}
        localization={localisation}
        icons={tableIcons as any}
        options={{
          exportButton: true,
          tableLayout: "auto",
          exportAllData: true,
          paging: true,

          paginationType: "stepped",
          headerStyle: {
            backgroundColor: "#934b97",
            color: "#FFF",
            fontWeight: "bold",
          },
          rowStyle: {
            border: "0px solid white",
          },
        }}
      
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
            
               onAdd({newData,resolve,reject})
            
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
          
                onUpdate({newData,resolve,reject})
         
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
            
                onDelete({newData:oldData,resolve,reject})
         
          
            }),
        }}
      />
    </div>
  );
};
export default Table;

const localisation = {
  body: {
    emptyDataSourceMessage: "Tableau vide",
    addTooltip: "Ajouter",
    deleteTooltip: "Supprimer",
    editTooltip: "Editer",
    filterRow: {
      filterTooltip: "Filtrer",
    },
    editRow: {
      deleteText: "Voulez-vous supprimer cette ligne?",
      cancelTooltip: "Annuler",
      saveTooltip: "Enregistrer",
    },
  },
  grouping: {
    placeholder: "Tirer l'entête ...",
    groupedBy: "Grouper par:",
  },
  header: {
    actions: "Actions",
  },
  pagination: {
    labelDisplayedRows: "{from}-{to} de {count}",
    labelRowsSelect: "lignes",
    labelRowsPerPage: "lignes par page:",
    firstAriaLabel: "Première page",
    firstTooltip: "Première page",
    previousAriaLabel: "Page précédente",
    previousTooltip: "Page précédente",
    nextAriaLabel: "Page suivante",
    nextTooltip: "Page suivante",
    lastAriaLabel: "Dernière page",
    lastTooltip: "Dernière page",
  },
  toolbar: {
    addRemoveColumns: "Ajouter ou supprimer des colonnes",
    nRowsSelected: "{0} ligne(s) sélectionée(s)",
    showColumnsTitle: "Voir les colonnes",
    showColumnsAriaLabel: "Voir les colonnes",
    exportTitle: "Exporter",
    exportAriaLabel: "Exporter",
    exportCSVName: "Exporter en EXCEL",
    exportPDFName: "Exporter en PDF",
    searchTooltip: "Chercher",
    searchPlaceholder: "Chercher",
  },
};
