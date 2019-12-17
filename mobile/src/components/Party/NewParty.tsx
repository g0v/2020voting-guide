import { Box, Typography } from '@material-ui/core';
import React from 'react';

const NewParty = ({ name }: { name: string }) => {
    return (
        <Box bgcolor="#F7F7F7" height="100vh" textAlign="center" py={5}>
            <img width="200" src="/img/doll/new_party.svg" alt="new party" />
            <Box mb={1}>
                <Typography variant="h4">{`${name}上屆沒有立委唷！`}</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">
                這個政黨沒有法案紀錄
            </Typography>
            <Typography variant="body2" color="textSecondary">
                透過其他方法認識他們
            </Typography>
        </Box>
    );
};

export default NewParty;
