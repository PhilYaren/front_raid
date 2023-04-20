import { createTheme, Theme, ComponentsOverrides } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends ComponentsOverrides {}
  interface ThemeOptions extends ComponentsOverrides {}
}

export const muiTheme: Theme = createTheme({

});
