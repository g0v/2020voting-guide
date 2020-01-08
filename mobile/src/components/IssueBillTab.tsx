import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import Scroll from 'react-scroll';
import issuesObj from '../data/issues.json';
import IssueBill, { Bill } from './IssueBill';
import IssueFilter from './IssueBill/IssueFilter';
import NewParty from './Party/NewParty';

const Link = Scroll.Link;
const Element = Scroll.Element;

const customStyle = {
    issueContainer: {
        paddingTop: '20px',
        marginTop: '1px'
    },
    issueTitle: {
        height: 36,
        fontWeight: 500,
        fontSize: 16,
        lineHeight: '150%',
        color: '#222222'
    }
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        issueCard: {
            padding: 0,
            height: 450,
            overflowY: 'scroll',
            overflowX: 'hidden'
        },
        issueH1: {
            fontWeight: 800,
            fontSize: 20,
            lineHeight: '150%',
            letterSpacing: '0.03em',
            color: '#2584A3'
        },
        normalTab: {
            cursor: 'pointer',
            paddingLeft: 16,
            width: '100%',
            display: 'inline-block',
            height: 35,
            lineHeight: '35px',
            fontFamily: 'Noto Sans TC'
        },
        activeTab: {
            background: '#3199ba57',
            color: '#2584A3'
        }
    })
);

const IssueList: FunctionComponent<{
    isParty?: boolean;
    filteredIssue: Array<string>;
    selectedIssue: string[];
    bills: Bill[];
    selectIssue: (issue: string) => void;
    handleComplete: () => void;
}> = ({ isParty = false, children, filteredIssue, bills, selectedIssue, selectIssue, handleComplete }) => {
    return (
        <React.Fragment>
            <Element
                id="containerElement"
                className="element"
                name="scrollContainer"
                style={{
                    position: 'relative',
                    height: '600px',
                    overflow: 'scroll'
                }}
            >
                {children}
                {filteredIssue
                    .map(issue => ({
                        issue: issue,
                        bills: bills.filter(i => issue === i.category)
                    }))
                    .filter(issue => issue.bills.length !== 0)
                    .map(issue => (
                        <Element name={issue.issue} key={issue.issue} style={{ cursor: 'pointer' }}>
                            <IssueBill isParty={isParty} issue={issue.issue} bills={issue.bills} />
                        </Element>
                    ))}
            </Element>
        </React.Fragment>
    );
};

const IssueBillTab: FunctionComponent<{
    bills: Bill[];
    isParty?: boolean;
    party?: string;
    padding?: object;
    isDesktop?: boolean;
}> = ({ isParty = false, party = '', bills = [], padding = {}, isDesktop = false, children }) => {
    const classes = useStyles();

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
            {isDesktop ? (
                <Box py={3} bgcolor="#F7F7F7">
                    <Grid container spacing={3}>
                        <Grid item sm={3}>
                            <Card>
                                <CardContent>
                                    <Typography className={classes.issueH1}>所有議題</Typography>
                                </CardContent>
                                <CardContent className={classes.issueCard}>
                                    {filteredIssue
                                        .map(issue => ({
                                            issue: issue,
                                            bills: bills.filter(i => issue === i.category)
                                        }))
                                        .filter(issue => issue.bills.length !== 0)
                                        .map(issue => (
                                            <div style={customStyle.issueTitle} key={issue.issue}>
                                                <Link
                                                    activeClass={classes.activeTab}
                                                    className={classes.normalTab}
                                                    to={issue.issue}
                                                    spy={true}
                                                    smooth={true}
                                                    duration={500}
                                                    containerId="containerElement"
                                                >
                                                    {issue.issue}
                                                </Link>
                                            </div>
                                        ))}
                                </CardContent>
                            </Card>
                            <IssueFilter
                                isDesktop={isDesktop}
                                selected={selectedIssue}
                                selectIssue={selectIssue}
                                updateSelectedIssue={updateSelectedIssue}
                                complete={handleComplete}
                                isParty={isParty}
                                bills={bills}
                            />
                        </Grid>
                        <Grid item sm={9}>
                            <IssueList
                                filteredIssue={filteredIssue}
                                selectedIssue={selectedIssue}
                                bills={bills}
                                selectIssue={selectIssue}
                                handleComplete={handleComplete}
                            >
                                {children}
                            </IssueList>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <>
                    <IssueList
                        isParty={isParty}
                        filteredIssue={filteredIssue}
                        selectedIssue={selectedIssue}
                        bills={bills}
                        selectIssue={selectIssue}
                        handleComplete={handleComplete}
                    >
                        {children}
                    </IssueList>
                    <IssueFilter
                        isDesktop={isDesktop}
                        selected={selectedIssue}
                        selectIssue={selectIssue}
                        isParty={isParty}
                        updateSelectedIssue={updateSelectedIssue}
                        complete={handleComplete}
                        bills={bills}
                    />
                </>
            )}
        </Box>
    );
};

export default IssueBillTab;
