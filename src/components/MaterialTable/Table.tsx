import MaterialTable from "material-table";
import { tableIcons } from "./Icons";
import { TableComponents } from "./Components";
import { trpc } from "../../utils/trpc";
import { toast } from "react-toastify";

export type TColumns = {
  title: string;
  field: string;
  cellStyle?: Object;
  align?: any;
  editComponent?: any;
  render?: any;

};
type TableProps = {
  columns: Array<TColumns>;
  title: string;
  portrait?: boolean;
  endpoint: string;
  filter?: Function;
  filter_id?: string;
  limit?:number
};
const Table = ({
  columns,
  title,
  portrait,
  endpoint,
  filter,
  filter_id,limit
}: TableProps) => {
  const afterEffectHandler = {
    onSuccess: () => {
      query.refetch();
    },
    onError: (data: any) => {
      console.log(data);
      // toast.error("Erreur est survenue", {
      //   position: "bottom-left",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   });;
    },
  };
  const query = trpc.useQuery([(endpoint + ".getAll") as any]);
  const mutationCreate = trpc.useMutation(
    [(endpoint + ".create") as any],
    afterEffectHandler
  );
  const mutationUpdate = trpc.useMutation(
    [(endpoint + ".update") as any],
    afterEffectHandler
  );
  const mutationDelete = trpc.useMutation(
    [(endpoint + ".delete") as any],
    afterEffectHandler
  );
const onToast = ({message,type='success'}:{message: string,type?:'error'|'success'}) => {
switch(type){
  case 'error':
    toast.error(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });;
    break;
  case 'success':
    toast.success(message, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    break;
    default:
      toast.success(message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

      }
}
  const onAdd = async ({ newData, resolve, reject }: any) => {
    const sendData = filter_id ? { ...newData, filter_id } : newData;
    mutationCreate.mutate(sendData,{
      onSuccess: () => {
        resolve();
        onToast({message:'Nouveau '+endpoint+" ajouté"});
      },

      onError: (data: any) => {
        reject();
        onToast({message:"Erreur d'ajout, vérifiez vos entrées",type:'error'});
      }
    });
  

  };
  const onDelete = async ({ newData, resolve, reject }: any) => {
    mutationDelete.mutate({ id: newData.id },{
      onSuccess: () => {
        resolve();
        onToast({message:'Vous avez supprimé un '+endpoint});
      },

      onError: (data: any) => {
        reject();
        onToast({message:"Suppression réjetée",type:'error'});
      }
    });
   
  };
  const onUpdate = async ({ newData, resolve, reject }: any) => {
    mutationUpdate.mutate(newData,{
      onSuccess: () => {
        resolve();
        onToast({message:'Modification effectuée'});
      },

      onError: (data: any) => {
        reject();
        onToast({message:"Impossible de modifier, vérifiez vos entrées",type:'error'});
      }
    });

  };
  return (
    <div className="py-5 px-5">
      <MaterialTable
        isLoading={
          query.isLoading ||
          mutationCreate.isLoading ||
          mutationUpdate.isLoading ||
          mutationDelete.isLoading
        }
        columns={columns}
        data={filter ? (filter(query.data) as any) : (query.data as any)}
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
        }}
        editable={{
          onRowAdd:limit?filter!(query.data).length>=1?undefined:  (newData) =>
            new Promise((resolve, reject) => {
              onAdd({ newData, resolve, reject });
            }):(newData) =>
            new Promise((resolve, reject) => {
              onAdd({ newData, resolve, reject });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              onUpdate({ newData, resolve, reject });
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              onDelete({ newData: oldData, resolve, reject });
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
