import { AppBar, Box, IconButton, Link, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
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
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
};

export default Header;
