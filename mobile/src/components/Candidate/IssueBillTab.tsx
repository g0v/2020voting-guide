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

    const [selectedIssue, updateSelectedIssue] = React.useState([] as string[]);

    const selectIssue = (issue: string) => {
        const new_selected = selectedIssue.filter(x => x !== issue);
        if (new_selected.length === selectedIssue.length) {
            updateSelectedIssue([...selectedIssue, issue]);
        } else {
            updateSelectedIssue(new_selected);
        }
    };

    const [issueFilter, updateIssueFilter] = React.useState([] as string[]);
    const handleComplete = () => {
        updateIssueFilter(selectedIssue);
    };
    const filteredIssue = issueFilter.length ? issueFilter : issues;

    return (
        <>
            <Bulletin
                primary="對於民眾關注的熱門議題，候選人在立法院實際提案和連署的法案。"
                secondary="這些議題怎麽產生的？"
            />
            <div>
                {filteredIssue
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
            <IssueFilter
                selected={selectedIssue}
                selectIssue={selectIssue}
                complete={handleComplete}
            />
        </>
    );
};

export default IssueBillTab;
