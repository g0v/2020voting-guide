import { AppBar, Box, Button, Dialog, Fab, IconButton, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
        desktopFab: {
            position: 'relative',
            borderRadius: '0px !important',
            marginTop: '20px',
            width: '100% !important',
            fontSize: 16
        },
        extendedIcon: {
            marginRight: theme.spacing(1)
        },
        appBar: {
            zIndex: 2000
        },
        bottomBar: {
            zIndex: 2000,
            position: 'fixed',
            bottom: '0px',
            background: '#fff',
            width: '100%',
            boxShadow: '0px -1px 0px rgba(0, 0, 0, 0.1)'
        },
        desktopBottomBar: {
            zIndex: 2000,
            position: 'fixed',
            bottom: '0px',
            background: '#fff',
            width: '100%',
            boxShadow: '0px -1px 0px rgba(0, 0, 0, 0.1)',
            right: 0
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1
        },
        checkbox: {
            textAlign: "left",
            lineHeight: "1.2",
            position: 'absolute',
            top: '4px',
            left: '4px'
        },
        issueButtonWrapper: {
            width: (props:any) => `calc((100% - ${4 * 2 * (props.length)}px) / ${props.length})`,
        },
        issueButton: {
            width:'100%',
            height: 100,
            display: 'flex',
            border: (props:any) => props.active ? 'none' : '1px solid rgba(49, 153, 186, 0.41)',
            padding: '6px',
            background: (props:any) => props.active ? 'rgba(49, 153, 186, 0.2)' : '#fff'
        },
        issueButtonTitle: {
            color: '#222222',
            lineHeight: "1.2",
            height: '38px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    })
);

const IssueFilter = ({
    selected,
    selectIssue,
    complete,
    bills,
    isDesktop
}: {
    isDesktop: boolean;
    selected: string[];
    selectIssue: (issue: string) => void;
    complete: () => void;
    bills: Bill[];
}) => {
    const classes = useStyles();
    const classesProps = useStyles;

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
                className={isDesktop ? classes.desktopFab : classes.fab}
            >
                {!isDesktop && 
                    <FilterListIcon
                        fontSize="small"
                        className={classes.extendedIcon}
                    />
                }
                {
                    selected.length ? `${selected.length} 個議題` : '篩選議題'
                }
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
                                        <Box m={0.5} display="block"
                                            className={classesProps({
                                                length: (window.innerWidth < 414) ? 3 : (window.innerWidth < 767 ? 6 : 10)
                                            }).issueButtonWrapper}>
                                            <Button
                                                color="primary"
                                                className={classesProps({
                                                    active: selected.includes(issue)
                                                }).issueButton}
                                                onClick={() => {
                                                    selectIssue(issue);
                                                }}
                                            >
                                                <Box className={classesProps().checkbox}>
                                                    {
                                                        selected.includes(issue) ? (
                                                            <CheckCircleIcon style={{ color: '#3199BA' }} />
                                                        ) : (
                                                            <CheckCircleOutlineIcon style={{ color: 'rgba(49, 153, 186, 0.4)' }} />
                                                        )
                                                    }
                                                </Box>
                                                <Typography
                                                    variant="h4"
                                                    className={classes.issueButtonTitle}>
                                                    {issue}
                                                </Typography>
                                                <Typography
                                                    variant="h5"
                                                    style={{
                                                        color: '#2584A3',
                                                        position: 'absolute',
                                                        bottom: '8px',
                                                        fontFamily: 'Roboto',
                                                        fontWeight: 600
                                                    }}>
                                                {
                                                    bills.filter(
                                                        ({ category }) =>
                                                            category === issue
                                                    ).length
                                                }
                                                </Typography>
                                            </Button>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Dialog>
            {open ? (
                <Box
                    className={isDesktop ? classes.desktopBottomBar : classes.bottomBar}>
                    <Toolbar>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ width: '100%', boxShadow: 'none' }}
                            onClick={() => {
                                handleClose();
                                complete();
                            }}
                        >
                            完成
                        </Button>
                    </Toolbar>
                </Box>
            ) : null}
        </>
    );
};

export default IssueFilter;
