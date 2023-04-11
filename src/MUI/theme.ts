import { createTheme } from "@material-ui/core";

export const muiTheme = createTheme({
    palette: {
        primary: {
          light: '#757ce8',
          main: '#263238',
          dark: '#002884',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ff7961',
          main: '#fff',
          dark: '#ba000d',
          contrastText: '#000',
        },
      },
})