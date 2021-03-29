import 'raf/polyfill'
import React from 'react'
import { render } from 'react-dom'

import Root from './components/root'
import './styles/tippy.compiled.global.css'
import './styles/main.global.scss'

if (module.hot) module.hot.accept()

render(<Root />, document.getElementById('root'))
