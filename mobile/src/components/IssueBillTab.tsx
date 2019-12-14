import { Box } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import issuesObj from '../data/issues.json';
import IssueBill, { Bill } from './IssueBill';
import IssueFilter from './IssueBill/IssueFilter';
import NewParty from './Party/NewParty';

const IssueBillTab: FunctionComponent<{
    bills: Bill[];
    isParty?: boolean;
    party?: string;
}> = ({ isParty = false, party = '', bills = [], children }) => {
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
    if (isParty && !bills) return <NewParty name={party} />;
    const issues = Object.values(issuesObj).flat();

    const filteredIssue = issueFilter.length ? issueFilter : issues;

    return (
        <Box bgcolor="#F7F7F7" py={1}>
            {children}
            <div>
                {filteredIssue
                    .map(issue => ({
                        issue: issue,
                        bills: bills.filter(i => issue === i.category)
                    }))
                    .filter(issue => issue.bills.length != 0)
                    .map((issue, i) => (
                        <IssueBill
                            key={`${issue.issue}${i}`}
                            issue={issue.issue}
                            bills={issue.bills}
                        />
                    ))}
            </div>
            <IssueFilter
                selected={selectedIssue}
                selectIssue={selectIssue}
                complete={handleComplete}
                bills={bills}
            />
        </Box>
    );
};

export default IssueBillTab;
