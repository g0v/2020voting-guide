import { AppBar, Box, Button, Dialog, Fab, IconButton, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import React from 'react';
import issues from '../../data/issues.json';
import { Bill } from './index';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2)
        },
        extendedIcon: {
            marginRight: theme.spacing(1)
        },
        appBar: {
            zIndex: 2000
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1
        },
        issueButton: {
            width: 120,
            height: 100
        }
    })
);

const IssueFilter = ({
    selected,
    selectIssue,
    complete,
    bills
}: {
    selected: string[];
    selectIssue: (issue: string) => void;
    complete: () => void;
    bills: Bill[];
}) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Fab
                variant="extended"
                size="medium"
                color="primary"
                onClick={handleClickOpen}
                className={classes.fab}
            >
                <FilterListIcon
                    fontSize="small"
                    className={classes.extendedIcon}
                />
                篩選議題
            </Fab>
            {open ? (
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            篩選議題 {selected.length} 個
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={() => {
                                handleClose();
                                complete();
                            }}
                        >
                            完成
                        </Button>
                    </Toolbar>
                </AppBar>
            ) : null}
            <Dialog fullScreen open={open} onClose={handleClose}>
                <Box py={5}>
                    {Object.entries(issues).map(([category, issues]) => {
                        return (
                            <Box mt={4} mb={4} key={category}>
                                <Box mx={1}>
                                    <Typography variant="h4" color="primary">
                                        {category}
                                    </Typography>
                                </Box>
                                <Box
                                    mt={2}
                                    mx={1}
                                    display="flex"
                                    justifyContent="row-start"
                                    flexWrap="wrap"
                                >
                                    {issues.map(issue => (
                                        <Box m={0.5}>
                                            <Button
                                                color="primary"
                                                variant={
                                                    selected.includes(issue)
                                                        ? 'contained'
                                                        : 'outlined'
                                                }
                                                onClick={() => {
                                                    selectIssue(issue);
                                                }}
                                                className={classes.issueButton}
                                            >
                                                {issue}<br />
                                                {
                                                    bills.filter(
                                                        ({ category }) =>
                                                            category === issue
                                                    ).length
                                                } 提案
                                            </Button>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Dialog>
        </>
    );
};

export default IssueFilter;
