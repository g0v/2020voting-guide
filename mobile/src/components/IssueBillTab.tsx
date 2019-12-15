import { Box, Grid, Card, CardContent, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import issuesObj from '../data/issues.json';
import IssueBill, { Bill } from './IssueBill';
import IssueFilter from './IssueBill/IssueFilter';
import NewParty from './Party/NewParty';

const customStyle = {
    issueContainer: {
        paddingTop: '20px',
        marginTop: '1px'
    }
}

const IssueBillTab: FunctionComponent<{
    bills: Bill[];
    isParty?: boolean;
    party?: string;
    padding?: object;
    isDesktop?: boolean;
}> = ({ isParty = false, party = '', bills = [], padding = {}, isDesktop = false, children }) => {
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
        <Box bgcolor="#F7F7F7" py={1} style={padding}>
            {isDesktop ? 
                <Grid container spacing={3} style={customStyle.issueContainer}>
                    <Grid item sm={4}>
                        <Card>
                            <CardContent>
                                <Typography>所有議題</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={8}>navvvv</Grid>
                </Grid>
                 :
                <React.Fragment>
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
                </React.Fragment>
            }
        </Box>
    );
};

export default IssueBillTab;
