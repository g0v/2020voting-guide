import { Box, Typography, Button } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import BillDialog from './BillDialog';
import { simplifyCaseOfAction } from '../utils';
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
        maxHeight: open ? 'none' : '5em',
        overflow: 'hidden'
    })
});

const RelatePerson = ({
    proposer,
    cosignatory
}: {
    proposer: string;
    cosignatory: string;
}) => {
    const theme = useTheme();
    return (
        <Box my={1} p={1} bgcolor={theme.palette.background.default}>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                提案人：{proposer.split('；').join('  ')}
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                連署： {cosignatory.split('；').join('  ')}
            </Typography>
        </Box>
    );
};

const Bill = ({
    name,
    billNo,
    description,
    caseOfAction,
    billProposer,
    billCosignatory
}: {
    name: string;
    billNo: string;
    description: string;
    caseOfAction: string;
    billProposer: string;
    billCosignatory: string;
}) => {
    const [open, setOpen] = React.useState(false);
    const [openDetail, setOpenDetail] = React.useState(false);
    const classes = useStyles(open);
    return (
        <Box mt={3} key={name}>
            <Typography
                variant="h3"
                onClick={() => {
                    setOpen(!open);
                }}
            >
                {name}
            </Typography>
            <Box my={1}>
                <div
                    className={classes.billInfo}
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <Typography variant="body2" color="textSecondary">
                        {description
                            ? description
                            : simplifyCaseOfAction(caseOfAction)}
                    </Typography>
                </div>
                {open ? (
                    <RelatePerson
                        proposer={billProposer}
                        cosignatory={billCosignatory}
                    />
                ) : null}
                {open ? (
                    <Box my={1}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                setOpenDetail(!openDetail);
                            }}
                        >
                            詳細法案
                        </Button>
                    </Box>
                ) : null}
            </Box>
            {openDetail ? (
                <BillDialog
                    id={billNo}
                    open={openDetail}
                    handleClose={() => {
                        setOpenDetail(false);
                    }}
                />
            ) : null}
        </Box>
    );
};

const IssueBill = ({ issue, bills }: IssueBillProps) => {
    const theme = useTheme();
    const legislatorBill = bills.filter(
        bill => bill.proposerType === '立委提案'
    );
    const caucusBill = bills.filter(bill => bill.proposerType === '黨團提案');

    return (
        <>
            <Box mx={1.5} py={3}>
                <Typography variant="h2">{issue}</Typography>
                {legislatorBill.map(bill => (
                    <Bill {...bill} key={bill.billNo} />
                ))}
                {caucusBill.length === 0 ? null : (
                    <Box borderLeft="3px solid grey" pl={1} mt={2}>
                        <Typography variant="h4">黨團提案</Typography>
                        {caucusBill.map(bill => (
                            <Typography variant="h5" key={bill.billNo}>
                                {bill.name}
                            </Typography>
                        ))}
                    </Box>
                )}
            </Box>
            <Box p={1} bgcolor={theme.palette.background.default} />
        </>
    );
};

export default IssueBill;
