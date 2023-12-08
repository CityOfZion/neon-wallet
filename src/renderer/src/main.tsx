import React from 'react'
import ReactDOM from 'react-dom/client'
import { setupSentryReact } from '@renderer/setup/sentryReact'

import { setupI18n } from './setup/i18next'
import { App } from './App'

import './assets/css/index.css'

setupI18n()
setupSentryReact()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
