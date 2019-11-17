import React, { FunctionComponent } from 'react';
import { Box } from '@material-ui/core';

const Card: FunctionComponent = ({ children }) => (
    <Box
        mt={1.5} py={3} px={2}
        borderRadius="10px" boxShadow="0px 2px 10px rgba(0, 0, 0, 0.03)" bgcolor="white"
    >
        {children}
    </Box>
)


export default Card;
