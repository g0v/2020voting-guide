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
        <>
            <Box
                pt={3.5}
                pb={3}
                px={2}
                height={76}
                bgcolor={theme.palette.background.default}
            >
                <Typography variant="h2">{title}</Typography>
                <Box height={22} />
                {children}
            </Box>
        </>
    );
};

export default Navigation;
