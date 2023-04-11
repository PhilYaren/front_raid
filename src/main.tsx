import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core'
import { muiTheme } from './MUI/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
  <MuiThemeProvider theme={muiTheme}>
    <App />
    </MuiThemeProvider>
    </BrowserRouter>
)
