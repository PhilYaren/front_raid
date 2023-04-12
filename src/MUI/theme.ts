import { createTheme, Theme, ThemeOptions, ComponentsOverrides } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends ComponentsOverrides {}
  interface ThemeOptions extends ComponentsOverrides {}
}

export const muiTheme: Theme = createTheme({
  // palette: {
  //   primary: {
  //     light: '#757ce8',
  //     main: '#c2a17f',
  //     dark: '#002884',
  //     contrastText: '#fff',
  //   },
  //   secondary: {
  //     light: '#ff7961',
  //     main: '#c2a17f',
  //     dark: '#ba000d',
  //     contrastText: '#000',
  //   },
  // },
  // components: {
  //   MuiTab: {
  //     styleOverrides: {
  //       root: {
  //         '&$selected': {
  //           color: 'blue',
  //         },
  //       },
  //     },
  //     variants: [
  //       {
  //         props: { disabled: true },
  //         style: {
  //           opacity: 0.5,
  //         },
  //       },
  //     ],
  //   },
  // },
});
