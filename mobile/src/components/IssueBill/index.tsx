import { Box } from '@material-ui/core';
import React from 'react';
import CaucusBill from './CaucusBillCard';
import './IssueBill.scss';
import PersonalBill from './PersonalBillCard';
import Issue from '../Issue';
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
    billStatus: string;
    pdfUrl: string;
    vernacular: string;
}

interface IssueBillProps {
    issue: string;
    bills: Bill[];
}

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
                {legislatorBill.map((bill, i) => (
                    <PersonalBill {...bill} key={bill.billNo + i} />
                ))}
                {caucusBills.length ? <CaucusBill bills={caucusBills} /> : null}
            </Box>
        </>
    );
};

export default IssueBill;
