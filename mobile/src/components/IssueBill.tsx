import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
import { simplifyCaseOfAction } from '../utils';
import BillDialog from './BillDialog';
import Card from './Card';

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
    billProposerString: string;
    billCosignatoryString: string;
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
    billProposerString,
    billCosignatoryString,
    proposerType,
}: {
    name: string;
    billNo: string;
    description: string;
    caseOfAction: string;
    billProposerString: string;
    billCosignatoryString: string;
    proposerType: string;
}) => {
    const [open, setOpen] = React.useState(false);
    const [openDetail, setOpenDetail] = React.useState(false);
    const classes = useStyles(open);
    return (
        <Card key={name} >
            <ProposerType type={proposerType} />
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
                        proposer={billProposerString}
                        cosignatory={billCosignatoryString}
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
        </Card>
    );
};

const ProposerType = ({ type }: { type: string }) => <Box color="text.hint" mb={1.5}>{type}</Box>

const Issue = ({ name }: { name: string }) =>
    <Box display="flex">
        <Box width="8px" height="24px" mr={1} borderRadius="4px" bgcolor="primary.main" />
        <Typography variant="h2">{name}</Typography>
    </Box>


const IssueBill = ({ issue, bills }: IssueBillProps) => {
    const legislatorBill = bills.filter(
        bill => bill.proposerType === '立委提案'
    );
    const caucusBill = bills.filter(bill => bill.proposerType === '黨團提案');

    return (
        <>
            <Box mx={1.5} py={3}>
                <Issue name={issue} />
                {legislatorBill.map(bill => (
                    <Bill {...bill} key={bill.billNo} />
                ))}
                {caucusBill.length === 0 ? null : (
                    <Card>
                        <ProposerType type={"黨團提案"} />
                        {caucusBill.map(bill => (
                            <Typography variant="h5" key={bill.billNo}>
                                {bill.name}
                            </Typography>
                        ))}
                    </Card>
                )}
            </Box>
        </>
    );
};

export default IssueBill;
