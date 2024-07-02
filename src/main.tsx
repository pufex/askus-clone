import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/index.css'
import GlobalsProvider from './contexts/Globals.tsx'
import { BrowserRouter } from 'react-router-dom'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if(import.meta.env.NODE_ENV === "production")
  disableReactDevTools();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalsProvider>
          <App />
      </GlobalsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
