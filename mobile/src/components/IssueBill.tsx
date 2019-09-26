import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';

export interface Bill {
    bill: string;
    description: string;
    date: string;
    proposer: string;
    category: string;
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
                    <Box my={3} key={bill.bill}>
                        <Typography variant="h3">{bill.bill}</Typography>
                        <Box my={1}>
                            <Typography variant="h5" color="textSecondary">
                                {bill.description}
                            </Typography>
                        </Box>
                        <Box my={1}>
                            <Typography variant="h5" color="textSecondary">
                                {bill.date} 提案
                            </Typography>
                        </Box>
                    </Box>
                ))}
                {/* {content.map(({ proposer, content }) => (
                    <Box key={proposer}>
                        <Box
                            my={1.5}
                            borderColor="primary.main"
                            borderLeft={8}
                            pl={0.5}
                        >
                            <Typography variant="h4">{proposer}</Typography>
                        </Box>
                        {content.map(bill => (
                            <Box my={3} key={bill.bill}>
                                <Typography variant="h3">
                                    {bill.bill}
                                </Typography>
                                <Box my={1}>
                                    <Typography
                                        variant="h5"
                                        color="textSecondary"
                                    >
                                        {bill.description}
                                    </Typography>
                                </Box>
                                <Box my={1}>
                                    <Typography
                                        variant="h5"
                                        color="textSecondary"
                                    >
                                        {bill.date} 提案
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ))} */}
            </Box>
            <Box p={1} bgcolor={theme.palette.background.default} />
        </>
    );
};

export default IssueBill;
