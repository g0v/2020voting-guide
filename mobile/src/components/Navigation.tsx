import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

interface Navigation {
    title: string;
    children?: React.ReactNode;
}

const Navigation = ({ title, children }: Navigation) => {
    const theme = useTheme();

    return (
        <Box py={3} px={2} bgcolor={theme.palette.background.default}>
            <Box mb="15px">
                <Typography variant="h2" >{title}</Typography>
            </Box>
            {children}
        </Box>
    );
};

export default Navigation;
