import { Box, Typography } from '@material-ui/core';
import React from 'react';

interface BigNum {
    num: number;
    unit: string;
    text1: string;
    text2: string;
}

const BigNum = ({ num, unit, text1, text2=''}: BigNum) => {
    return (
        <Box textAlign="center">
            <Box
                fontWeight={500}
                fontFamily="Noto Sans TC"
                color="primary.main"
            >
                <Box component="span" fontSize={72}>
                    {num}
                </Box>
                <Box component="span" fontSize={18}>
                    {unit}
                </Box>
            </Box>
            <Typography variant="h5" color="textSecondary">
                {text1}
            </Typography>
            <Typography variant="h5" color="textSecondary">
                {text2}
            </Typography>
        </Box>
    );
};

export default BigNum;
