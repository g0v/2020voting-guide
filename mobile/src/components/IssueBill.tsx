import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import BillDialog from './BillDialog';
export interface Bill {
    name: string;
    description: string;
    date: string;
    proposer: string;
    proposerType: string;
    category: string;
    billNo: string;
    caseOfAction: string;
    billOrg: string;
    billProposer: string;
    billCosignatory: string;
    pdfUrl: string;
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
                    <Box mt={3} key={bill.name}>
                        <Typography variant="h3">{bill.name}</Typography>
                        <Box my={1}>
                            <Typography variant="body2" color="textSecondary">
                                {bill.description}
                            </Typography>
                        </Box>
                        <Box my={1} height="5em" overflow="hidden">
                            <Typography variant="body2" color="textSecondary">
                                {bill.caseOfAction}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box p={1} bgcolor={theme.palette.background.default} />
        </>
    );
};

export default IssueBill;
