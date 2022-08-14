import { Input } from "@geist-ui/core";
import { ThemeProvider, createTheme, Paper, TextField } from "@mui/material";
export const TableComponents = {
  Container: (props: any) => <Paper {...props} elevation={0} />,
  EditField: (props: any) => (
    <Input
      clearable
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
     
    />
  ),
};
