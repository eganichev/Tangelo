// Startup point for the client side application
import 'babel-polyfill';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.less';

ReactDOM.render((<App/>),
    document.querySelector('#app')); 
