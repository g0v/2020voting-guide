import { AppBar, Box, Button, IconButton, Link, Toolbar } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ReportIcon from '@material-ui/icons/Report';
import clsx from 'clsx';
import React from 'react';
import './Header.scss';

interface HeaderProps {
    open: boolean;
    handleDrawerOpen(): void;
}

const Header = ({ open, handleDrawerOpen }: HeaderProps) => {
    return (
        <>
            <AppBar className={clsx('header', open && 'header--open')}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon className="header__menu-icon" />
                    </IconButton>
                    <Link href="/" color="inherit">
                        <Box className="header__inner"></Box>
                    </Link>
                    <Box className="header__right">
                        <Switch>
                            <Route path="/vernacularlist">
                                <Link target="_blank" href="https://forms.gle/jCUopFeZg4jeaMjw9" >
                                    <Button size="small" variant="outlined" startIcon={<ReportIcon color="error" />} >
                                        回報問題
                                    </Button>
	                            </Link>
                            </Route>
                        </Switch>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
};

export default Header;
