import { Box } from '@material-ui/core';
import React from 'react';
import CaucusBill from './CaucusBillCard';
import BillCard from './BillCard';
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
    isParty?: boolean;
}

const IssueBill = ({ issue, bills, isParty = false }: IssueBillProps) => {
    const legislatorBill = bills.filter(
        bill => bill.proposerType === '立委提案'
    );

    const caucusBills = bills
        .filter(bill => bill.proposerType === '黨團提案')
        .sort((billA, billB) => (billA.name > billB.name ? 0 : -1));

    const nonRegionalBills = bills.filter(
        bill => bill.proposerType === '不分區立委提案'
    );

    return (
        <>
            <Box mx={1.5} py={3}>
                <Issue name={issue} />
                {legislatorBill.map((bill, i) => (
                    <PersonalBill {...bill} key={bill.billNo + i} />
                ))}
                {caucusBills.length ? (
                    isParty ? (
                        caucusBills.map((bill, i) => (
                            <PersonalBill {...bill} key={bill.billNo + i} />
                        ))
                    ) : (
                        <CaucusBill bills={caucusBills} />
                    )
                ) : null}
                {nonRegionalBills.length ? (
                    <BillCard title="不分區類委提案" bills={nonRegionalBills} />
                ) : null}
            </Box>
        </>
    );
};

export default IssueBill;
