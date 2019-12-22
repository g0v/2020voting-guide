import { Box, Typography } from '@material-ui/core';
import React from 'react';

const Issue = ({ name }: { name: string }) => (
    <Box display="flex" alignItems="center">
        <Box
            width="8px"
            height="24px"
            mr={1}
            borderRadius="4px"
            bgcolor="primary.main"
        />
        <Typography variant="h2">{name}</Typography>
    </Box>
);

export default Issue;
