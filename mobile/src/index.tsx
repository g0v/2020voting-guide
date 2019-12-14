import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
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
            secondary: 'rgba(0, 0, 0, 0.54)',
            hint: 'rgba(0, 0, 0, 0.33)'
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
            fontSize: 24,
            lineHeight: '160%'
        },
        h3: {
            fontWeight: 500,
            lineHeight: '150%',
            fontSize: 20
        },
        h4: {
            fontSize: 16,
            lineHeight: '160%'
        },
        h5: {
            fontSize: 14
        },
        h6: {
            fontSize: 18,
            lineHeight: '160%'
        },
        body1: {
            fontSize: 18,
            lineHeight: '160%'
        },
        body2: {
            fontSize: 14
        }
    }
});

const render = (Component: any) => {
    ReactDOM.render(
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Component />
            </ThemeProvider>
        </BrowserRouter>,
        document.getElementById('root') as HTMLElement
    );
};
render(App);

/* eslint-disable */
if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept('./App', () => {
            const NextApp: JSX.Element = require('./App').default;
            render(NextApp);
        });
    }
}
/* eslint-enable */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
