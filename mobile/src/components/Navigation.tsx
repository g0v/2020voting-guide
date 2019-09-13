import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

interface Navigation {
    title: string;
    description: string;
}

const Navigation = ({ title, description }: Navigation) => {
    const theme = useTheme();
    return (
        <>
            <Box
                py={3}
                px={2}
                height={65}
                bgcolor={theme.palette.background.default}
            >
                <Typography variant="h2">{title}</Typography>
                <Box height={16} />
                <Typography variant="h5">{description}</Typography>
            </Box>
        </>
    );
};

export default Navigation;
