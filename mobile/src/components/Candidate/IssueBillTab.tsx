import React from 'react';
import Bulletin from '../Bulletin';
import IssueBill, { Bill } from '../IssueBill';
import IssueFilter from '../IssueFilter';

interface IssueBillTab {
    bills?: Bill[];
}

const IssueBillTab = ({ bills = [] }: IssueBillTab) => {
    const issues = [
        ...new Set(bills.filter(b => b.category).map(b => b.category))
    ];
    return (
        <>
            <Bulletin
                primary="對於民眾關注的熱門議題，候選人在立法院實際提案和連署的法案。"
                secondary="這些議題怎麽產生的？"
            />
            <div>
                {issues
                    .map(issue => ({
                        issue: issue,
                        bills: bills.filter(i => issue === i.category)
                    }))
                    .map(issue => (
                        <IssueBill
                            issue={issue.issue}
                            bills={issue.bills}
                            key={issue.issue}
                        />
                    ))}
            </div>
            <IssueFilter />
        </>
    );
};

export default IssueBillTab;
