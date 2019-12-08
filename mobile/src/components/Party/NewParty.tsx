import { Box } from '@material-ui/core';
import React from 'react';

const NewParty = () => {
    return (
        <Box
            // bgcolor={theme.palette.background.default}
            height="100vh"
            textAlign="center"
            py={5}
        >
            <img width="375" src="/img/new.svg" alt="施工中" />
        </Box>
    );
};

export default NewParty;
