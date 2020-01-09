import { AppBar, Box, Button, Dialog, Fab, IconButton, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import React from 'react';
import issues from '../../data/issues.json';
import kols from '../../data/kol.json';
import { Bill } from './index';

interface Kol {
    name: string;
    photo: string;
    os: string;
    background: string;
    issues: string[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            fontSize: 20,
            zIndex: 2000
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
            textAlign: 'left',
            lineHeight: '1.2',
            position: 'absolute',
            top: '4px',
            left: '4px'
        },
        issueButtonWrapper: {
            width: (props: any) => `calc((100% - ${4 * 2 * props.length}px) / ${props.length})`
        },
        issueButton: {
            width: '100%',
            height: 100,
            display: 'flex',
            border: (props: any) => (props.active ? 'none' : '1px solid rgba(49, 153, 186, 0.41)'),
            padding: '6px',
            background: (props: any) => (props.active ? 'rgba(49, 153, 186, 0.2)' : '#fff')
        },
        issueButtonTitle: {
            color: '#222222',
            lineHeight: '1.2',
            height: '38px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        active: {},
        inactive: {
            opacity: 0.7
        }
    })
);

const IssueFilter = ({
    selected,
    selectIssue,
    updateSelectedIssue,
    complete,
    bills,
    isDesktop,
    isParty = false
}: {
    isDesktop: boolean;
    selected: string[];
    selectIssue: (issue: string) => void;
    updateSelectedIssue: (issues: string[]) => void;
    complete: () => void;
    bills: Bill[];
    isParty?: boolean;
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

    const [active, setActive] = React.useState('自選');
    const activeKol = kols.filter(kol => kol.name === active)[0];

    return (
        <>
            <Fab
                variant="extended"
                size="large"
                color="primary"
                onClick={handleClickOpen}
                className={isDesktop ? classes.desktopFab : classes.fab}
                data-category="function"
                data-action="click"
                data-label={isParty ? 'applyFilterR' : 'applyFilterL'}
            >
                {!isDesktop && <FilterListIcon fontSize="small" className={classes.extendedIcon} />}
                {selected.length ? `${selected.length} 個議題` : '篩選議題'}
            </Fab>
            {open ? (
                <>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                篩選議題 {selected.length} 個
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </>
            ) : null}
            <Dialog fullScreen open={open} onClose={handleClose}>
                <Box pb={5}>
                    <Box height={isDesktop ? 64 : 56} />
                    <Box
                        position="fixed"
                        bgcolor="#FFFFFF"
                        height={159}
                        width="100%"
                        zIndex={2001}
                        borderBottom="1px solid #F7F7F7"
                    >
                        <Box pt={3} px={2} display="flex">
                            <Box
                                mx={1.5}
                                onClick={() => setActive('自選')}
                                data-category="function"
                                data-action="click"
                                data-label="persona自選"
                                textAlign="center"
                                className={active !== '自選' ? classes.inactive : undefined}
                            >
                                <Box
                                    height={68}
                                    width={68}
                                    border={active === '自選' ? '3px solid #EC502B' : '3px solid #FFFFFF'}
                                    borderRadius="50%"
                                >
                                    <img height="68px" width="68px" src="/img/kol/custom.svg" alt="自選" />
                                </Box>
                                <Box height={12} />
                                <Typography variant="h4">{'自選'}</Typography>
                            </Box>
                            {kols.map(kol => (
                                <Box
                                    key={kol.name}
                                    mx={1.5}
                                    data-category="function"
                                    data-action="click"
                                    data-label={`persona${kol.name}`}
                                    onClick={() => {
                                        setActive(kol.name);
                                        updateSelectedIssue(kol.issues);
                                    }}
                                    textAlign="center"
                                    className={active !== kol.name ? classes.inactive : undefined}
                                >
                                    <Box
                                        height={68}
                                        width={68}
                                        border={active === kol.name ? '3px solid #EC502B' : '3px solid #FFFFFF'}
                                        borderRadius="50%"
                                    >
                                        <img height="68px" width="68px" src={kol.photo} alt={kol.name} />
                                    </Box>
                                    <Box height={12} />
                                    <Typography variant="h4">{kol.name}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box height={159} />
                    {activeKol && (
                        <Box pt={2}>
                            <Box
                                py={1}
                                px={1}
                                display="flex"
                                justifyContent={isDesktop ? 'left' : 'center'}
                                color="#EC502B"
                            >
                                <Box width={31} height={26} pr={1} alignSelf="flex-start">
                                    <img src="/img/kol/left_quote.png" />
                                </Box>
                                <Box alignSelf="center">
                                    <Typography variant="h3">{activeKol.os}</Typography>
                                </Box>
                                <Box width={31} height={26} alignSelf="flex-end">
                                    <img src="/img/kol/right_quote.png" width={31} height={26} />
                                </Box>
                            </Box>
                            <Box py={2} px={2}>
                                <Typography variant="h5" color="textPrimary" paragraph>
                                    {activeKol.background}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    <Box bgcolor="#F7F7F7" py={1.5} px={2} display="flex" flexDirection="row-reverse">
                        <Typography variant="h5" color="primary">
                            <b>此候選人提案數</b>
                        </Typography>
                    </Box>
                    {Object.entries(issues).map(([category, issues]) => {
                        return (
                            <Box mt={4} mb={4} key={category}>
                                <Box mx={1}>
                                    <Typography variant="h4" color="primary">
                                        {category}
                                    </Typography>
                                </Box>
                                <Box mt={2} mx={1} display="flex" justifyContent="row-start" flexWrap="wrap">
                                    {issues.map(issue => (
                                        <Box
                                            key={issue}
                                            m={0.5}
                                            display="block"
                                            className={
                                                classesProps({
                                                    length:
                                                        window.innerWidth < 414 ? 3 : window.innerWidth < 767 ? 6 : 10
                                                }).issueButtonWrapper
                                            }
                                        >
                                            <Button
                                                color="primary"
                                                data-category="toggle"
                                                data-action="click"
                                                data-label={`ToogleIssue${issue}`}
                                                className={
                                                    classesProps({
                                                        active: selected.includes(issue)
                                                    }).issueButton
                                                }
                                                onClick={() => {
                                                    selectIssue(issue);
                                                    setActive('自選');
                                                }}
                                            >
                                                <Box className={classesProps().checkbox}>
                                                    {selected.includes(issue) ? (
                                                        <CheckCircleIcon
                                                            style={{
                                                                color: '#3199BA'
                                                            }}
                                                        />
                                                    ) : (
                                                        <CheckCircleOutlineIcon
                                                            style={{
                                                                color: 'rgba(49, 153, 186, 0.4)'
                                                            }}
                                                        />
                                                    )}
                                                </Box>
                                                <Typography variant="h4" className={classes.issueButtonTitle}>
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
                                                    }}
                                                >
                                                    {bills.filter(({ category }) => category === issue).length}
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
                <Box className={isDesktop ? classes.desktopBottomBar : classes.bottomBar}>
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
