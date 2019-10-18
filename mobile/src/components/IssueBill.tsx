import { Box, Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
    billInfo: (open: boolean) => ({
        height: open ? 'auto' : '5em',
        overflow: 'hidden'
    })
});

const Bill = ({
    name,
    description,
    caseOfAction
}: {
    name: string;
    description: string;
    caseOfAction: string;
}) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles(open);
    return (
        <Box mt={3} key={name}>
            <div
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <Typography variant="h3">{name}</Typography>
                <Box my={1}>
                    <Typography variant="body2" color="textSecondary">
                        {description}
                    </Typography>
                </Box>
                <Box my={1} className={classes.billInfo}>
                    <Typography variant="body2" color="textSecondary">
                        {caseOfAction}
                    </Typography>
                </Box>
            </div>
        </Box>
    );
};

const IssueBill = ({ issue, bills }: IssueBillProps) => {
    const theme = useTheme();

    return (
        <>
            <Box mx={1.5} py={3}>
                <Typography variant="h2">{issue}</Typography>
                {bills.map(bill => (
                    <Bill {...bill} />
                ))}
            </Box>
            <Box p={1} bgcolor={theme.palette.background.default} />
        </>
    );
};

export default IssueBill;
