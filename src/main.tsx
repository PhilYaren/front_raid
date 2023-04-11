import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { muiTheme } from './MUI/theme'
import axios from 'axios';
import store from './redux/store';
import { Provider } from 'react-redux';

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={muiTheme}>
      <Provider store={store}>
    <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
)
