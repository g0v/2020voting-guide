import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import BillDialog from './BillDialog';
export interface Bill {
    bill: string;
    description: string;
    date: string;
    proposer: string;
    proposerType: string;
    category: string;
    billNo: string;
}

interface IssueBillProps {
    issue: string;
    bills: Bill[];
}

const IssueBill = ({ issue, bills }: IssueBillProps) => {
    const theme = useTheme();

    return (
        <>
            <Box mx={1.5} py={3}>
                <Typography variant="h2">{issue}</Typography>
                {bills.map(bill => (
                    <Box mt={3} key={bill.bill}>
                        <Typography variant="h3">{bill.bill}</Typography>
                        <Box my={1}>
                            <Typography variant="h5" color="textSecondary">
                                {bill.description}
                            </Typography>
                        </Box>
                        <Box my={1}>
                            <Typography variant="h5" color="textSecondary">
                                {bill.date} {bill.proposerType}
                            </Typography>
                        </Box>
                        <BillDialog
                            id={bill.billNo}
                            proposerType={bill.proposerType}
                        />
                    </Box>
                ))}
            </Box>
            <Box p={1} bgcolor={theme.palette.background.default} />
        </>
    );
};

export default IssueBill;
