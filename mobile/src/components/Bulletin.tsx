import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const Bulletin = () => {
    const theme = useTheme();
    return (
        <Box
            px={1.5}
            py={3.5}
            bgcolor={theme.palette.background.default}
            className="outer"
        >
            <Box p={2} border="4px solid rgba(0,0,0,0.66)">
                <Typography variant="h4">
                    對於民眾關注的熱門議題，候選人在立法院實際提案和連署的法案。
                </Typography>
                <Typography variant="h5">這些議題怎麽產生的？</Typography>
            </Box>
        </Box>
    );
};

export default Bulletin;
