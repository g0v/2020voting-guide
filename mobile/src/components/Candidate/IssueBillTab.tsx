import React from 'react';
import { Fab } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import Bulletin from '../Bulletin';
import IssueBill, { Bill } from '../IssueBill';

interface IssueBillTab {
    bills?: Bill[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2)
        },
        extendedIcon: {
            marginRight: theme.spacing(1)
        }
    })
);

const IssueBillTab = ({ bills = [] }: IssueBillTab) => {
    const classes = useStyles();
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
            <Fab
                variant="extended"
                size="small"
                color="primary"
                className={classes.fab}
            >
                <FilterListIcon
                    fontSize="small"
                    className={classes.extendedIcon}
                />
                篩選議題
            </Fab>
        </>
    );
};

export default IssueBillTab;
