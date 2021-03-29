// eslint-ignore-file
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import './styles/tippy.compiled.global.css';
import './styles/main.global.scss';
if (module.hot)
    module.hot.accept();
ReactDOM.render(React.createElement(Root, null), document.getElementById('root'));
