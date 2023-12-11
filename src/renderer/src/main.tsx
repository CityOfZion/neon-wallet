import React from 'react'
import ReactDOM from 'react-dom/client'

import { setupI18next } from './libs/i18next'
import { setupSentryReact } from './libs/sentryReact'
import { App } from './App'

import './assets/css/index.css'

setupI18next()
setupSentryReact()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
