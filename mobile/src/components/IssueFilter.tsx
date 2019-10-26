import {
    AppBar,
    Toolbar,
    Dialog,
    IconButton,
    Typography,
    Slide,
    Button,
    Box
} from '@material-ui/core';
import React from 'react';
import { Fab } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import { TransitionProps } from '@material-ui/core/transitions';
import issues from '../data/issues.json';

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
            position: 'relative'
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1
        },
        issueButton: {
            width: 120,
            height: 100
            // margin: theme.spacing(0.5)
        }
    })
);

const IssueFilter = ({
    selected,
    selectIssue,
    complete
}: {
    selected: string[];
    selectIssue: (issue: string) => void;
    complete: () => void;
}) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Transition = React.forwardRef<unknown, TransitionProps>(
        function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        }
    );

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
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                // TransitionComponent={Transition}
            >
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
                            篩選議題 3個
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
                                            {issue}
                                        </Button>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    );
                })}
            </Dialog>
        </>
    );
};

export default IssueFilter;
