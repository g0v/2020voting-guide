import { Box, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';

interface BasePaper {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

const BasePaper = ({ children, title, subtitle }: BasePaper) => {
    return (
        <Box mx={2.5} py={3} mb={3}>
            <Box pb={1}>
                <Typography variant="h2">{title}</Typography>
            </Box>
            <Box pb={1.5}>
                <Typography variant="h5">{subtitle}</Typography>
            </Box>
            {children}
        </Box>
    );
};

export default BasePaper;
