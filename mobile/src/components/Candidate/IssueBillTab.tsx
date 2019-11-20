import { Box, Link } from '@material-ui/core';
import React from 'react';
import Alert from '../Alert';
import IssueBill, { Bill } from '../IssueBill';
import IssueFilter from '../IssueFilter';


const IssueBillTab = ({ name,constituency }: {name: string; constituency: string;}) => {

    const [bills, setBills] = React.useState<Bill[]>([]);
    React.useEffect(() => {
        fetch(`/api/bills/${constituency}/${name}`)
            .then(res => res.json())
            .then(setBills);
    }, [name]);

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
        <Box bgcolor="#F7F7F7" py={1}>
            <Alert>
              <span>{`以下是2012-2016 年${name}候選人在立法院實際提出的法案。`}</span>
              <br />
              <span>
                {`資料來源: `}
                <Link href="https://lis.ly.gov.tw/billtpc/billtp">
                  立法動態資訊網法案追蹤平台
                </Link>
              </span>
            </Alert>
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
                bills={bills}
            />
        </Box>
    );
};

export default IssueBillTab;
