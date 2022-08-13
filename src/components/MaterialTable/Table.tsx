import { Input } from "@geist-ui/core";
import { MuiThemeProvider } from "@material-ui/core";

import { amber } from "@mui/material/colors";
import MaterialTable from "material-table";
import { tableIcons } from "./Icons";
import { TableComponents } from './Components';

export type TColumns = {
  title: string;
  field: string;
  cellStyle?: Object;
};
type TableProps = {
  columns: Array<TColumns>;
  data: Array<Object>;
  title: string;
  portrait?: boolean;
};
const Table = ({ columns, data, title, portrait }: TableProps) => {

  return (
    <div className="py-5 px-5">
      <MaterialTable
        columns={columns}
        data={data}
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
              setTimeout(() => {
                /* setData([...data, newData]); */
                // addRow(newData, resolve, reject);
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                // updateRow(oldData, newData, resolve, reject);
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //deleteRow(oldData, resolve, reject);
              }, 1000);
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
