import { Box, Typography } from '@material-ui/core';
import React from 'react';

const Progressing = () => {
    return (
        <Box
            // bgcolor={theme.palette.background.default}
            height="100vh"
            textAlign="center"
            py={5}
        >
            <img width="375" src="/img/progressing.svg" alt="施工中" />
            <Box pt={4} pb={2} color="#EC502B">
                <Typography variant="h2">本頁施工中...</Typography>
            </Box>
            <Typography variant="h5" color="primary">
                我們正在趕工製作這一頁，先去其他頁面逛逛↓
            </Typography>
        </Box>
    );
};

export default Progressing;
