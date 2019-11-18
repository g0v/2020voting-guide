import React, { FunctionComponent } from 'react';
import { Box } from '@material-ui/core';

const Card: FunctionComponent = ({ children }) => (
    <Box
        mt={1.5} py={3} px={2}
        borderRadius="10px" boxShadow="3px 3px 4px 0px rgba(0,0,0,0.1)" bgcolor="white"
    >
        {children}
    </Box>
)


export default Card;
