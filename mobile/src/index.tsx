import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3199BA'
        },
        secondary: {
            main: '#F9F9F9'
        },
        background: {
            default: '#F9F9F9'
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)'
        }
    },
    typography: {
        fontFamily: [
            'Noto Sans TC',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Oxygen',
            'Ubuntu',
            'Cantarell',
            'Fira Sans',
            'Droid Sans',
            'Helvetica Neue',
            'sans-serif'
        ].join(','),
        h1: {
            fontWeight: 500,
            fontSize: 48
        },
        h2: {
            fontWeight: 'bold',
            fontSize: 24
        },
        h3: {
            fontWeight: 500,
            fontSize: 20
        },
        h4: {
            fontSize: 18
        },
        h5: {
            fontSize: 14
        },
        body1: {
            fontSize: 18,
            lineHeight: '160%'
        },
        body2: {
            fontSize: 14,
            lineHeight: '160%'
        }
    }
});

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
