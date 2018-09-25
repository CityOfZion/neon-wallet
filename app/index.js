import 'raf/polyfill'
import React from 'react'
import { render } from 'react-dom'

import store from './store/configureStore'
import Root from './components/Root'
import './styles/tippy.compiled.global.css'
import './styles/main.global.scss'

// eslint-disable-next-line
window.eval = global.eval = function() {
  throw new Error('Sorry, this app does not support window.eval().')
}

if (module.hot) module.hot.accept()

render(<Root store={store} />, document.getElementById('root'))
