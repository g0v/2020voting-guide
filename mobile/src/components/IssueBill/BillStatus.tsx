import React from 'react';
import { Typography, Box } from '@material-ui/core';

const BillStatus = ({ status }: { status: string }) =>
    status === '三讀' ? (
        <>
            <Typography variant="h5" color="primary">
                已三讀
            </Typography>
            <Box width={6} />
            <img width="20" height="20" src="/img/bill/pass.svg" alt="已三讀" />
        </>
    ) : status === '撤案' ? (
        <>
            <Typography variant="h5" color="textSecondary">
                已撤回
            </Typography>
            <Box width={6} />
            <img
                width="20"
                height="20"
                src="/img/bill/revoke.svg"
                alt="已撤回"
            />
        </>
    ) : (
        <Typography variant="h5" color="primary">
            尚在立法院審查協商
        </Typography>
    );
export default BillStatus;
