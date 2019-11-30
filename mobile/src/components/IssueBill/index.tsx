import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import CaucusBill from './CaucusBillCard';
import './IssueBill.scss';
import PersonalBill from './PersonalBillCard';

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

export const RelatePerson = ({
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

const Issue = ({ name }: { name: string }) => (
    <Box display="flex">
        <Box
            width="8px"
            height="24px"
            mr={1}
            borderRadius="4px"
            bgcolor="primary.main"
        />
        <Typography variant="h2">{name}</Typography>
    </Box>
);

const IssueBill = ({ issue, bills }: IssueBillProps) => {
    const legislatorBill = bills.filter(
        bill => bill.proposerType === '立委提案'
    );
    const caucusBills = bills
        .filter(bill => bill.proposerType === '黨團提案')
        .sort((billA, billB) => (billA.name > billB.name ? 0 : -1));

    return (
        <>
            <Box mx={1.5} py={3}>
                <Issue name={issue} />
                {legislatorBill.map(bill => (
                    <PersonalBill {...bill} key={bill.billNo} />
                ))}
                {caucusBills.length ? <CaucusBill bills={caucusBills} /> : null}
            </Box>
        </>
    );
};

export default IssueBill;
