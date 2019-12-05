import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent, ReactNode } from 'react';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1300,
        paddingTop: '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
        background: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed'
    },
    content: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'white',
        borderRadius: '24px 24px 0 0 '
    },
    top: {
        display: 'flex',
        flexShrink: 0,
        padding: '0 16px',
        height: '60px',
        alignItems: 'center',
        boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)'
    }
});

const Dialog: FunctionComponent<{ top?: ReactNode }> = ({ children, top }) => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box mb={2} className={classes.content}>
                {top ? <Box className={classes.top}>{top}</Box> : null}
                {children}
            </Box>
        </Box>
    );
};

export default Dialog;
