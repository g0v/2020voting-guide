import { AppBar, Box, Button, Link, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ReportIcon from '@material-ui/icons/Report';
import clsx from 'clsx';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Header.scss';

interface HeaderProps {
    open: boolean;
    handleDrawerOpen(): void;
}

const Header = ({ open, handleDrawerOpen }: HeaderProps) => {
    return (
        <>
            <AppBar className={clsx('header', open && 'header--open')}>
                <Toolbar className="header__toolbar">
                    <Link href="/" color="inherit" className="header__kv">
                        <div />
                    </Link>
                    <Box className="header__right">
                        <Switch>
                            <Route path="/vernacularlist">
                                <Link
                                    target="_blank"
                                    href="https://forms.gle/jCUopFeZg4jeaMjw9"
                                >
                                    <Button size="small" variant="outlined">
                                        <ReportIcon
                                            className="button-icon"
                                            color="error"
                                            fontSize="small"
                                        />
                                        回報問題
                                    </Button>
                                </Link>
                            </Route>
                        </Switch>
                        <IconButton
                            className="header__icon-btn"
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon className="header__menu-icon" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
};

export default Header;
