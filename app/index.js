import 'raf/polyfill'
import React from 'react'
import { createRoot } from 'react-dom/client'

import store from './store/configureStore'
import Root from './components/Root'
import './styles/tippy.compiled.global.css'
import './styles/main.global.scss'
import { setupSentryReact } from './util/SentryReactHelper'

setupSentryReact()

if (module.hot) module.hot.accept()

const container = document.getElementById('root')

const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(<Root store={store} />)
