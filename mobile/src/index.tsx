import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './components/Home';


ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
),document.getElementById('root') as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
