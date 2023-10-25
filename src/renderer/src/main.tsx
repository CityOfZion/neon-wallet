import React from 'react'
import ReactDOM from 'react-dom/client'

import { setupI18n } from './setup/i18next'
import { App } from './App'

import './assets/css/index.css'

setupI18n()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
