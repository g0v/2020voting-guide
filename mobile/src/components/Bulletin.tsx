import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';

interface Bulletin {
    primary: string;
    secondary?: string;
}

const Bulletin = ({ primary, secondary }: Bulletin) => {
    const theme = useTheme();
    return (
        <Box
            px={1.5}
            py={3.5}
            bgcolor={theme.palette.background.default}
            className="outer"
        >
            <Box p={2} border="4px solid rgba(0,0,0,0.66)">
                <Typography variant="h4">{primary}</Typography>
                <Typography variant="h5">{secondary}</Typography>
            </Box>
        </Box>
    );
};

export default Bulletin;
