import {
    AppBar,
    Box,
    IconButton,
    Link,
    Toolbar,
    Typography
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginRight: drawerWidth
        },
        title: {
            flexGrow: 1
        },
        hide: {
            display: 'none'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        icon: {
            textAlign: 'center',
            position: 'absolute',
            zIndex: 1,
            top: 3,
            left: 0,
            right: 0,
            margin: '0 auto'
        },
        menu: {
            zIndex: 2
        }
    })
);

interface Nav {
    open: boolean;
    handleDrawerOpen(): void;
}

const Nav = ({ open, handleDrawerOpen }: Nav) => {
    const classes = useStyles();

    return (
        <>
            <AppBar>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        className={clsx(open && classes.hide)}
                    >
                        <MenuIcon className={classes.menu} />
                    </IconButton>
                    <Box className={classes.icon}>
                        <Typography variant="h6" className={classes.title}>
                            <Link href="/" color="inherit">
                                <img alt="logo" src="/img/logo.svg" />
                            </Link>
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
};

export default Nav;
