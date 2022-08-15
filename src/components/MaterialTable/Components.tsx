import { Input } from "@geist-ui/core";
import { ThemeProvider, createTheme, Paper, TextField } from "@mui/material";
export const TableComponents = {
  Container: (props: any) => <div {...props} className="shadow-md bg-white" />,
 
  EditField: (props: any) => (
    <Input
      clearable
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
     
    />
  ),
};
