import React from 'react';
import {
    Dialog,
    DialogContent,
    Button,
    Typography,
    Box
} from '@material-ui/core';
import { diff_match_patch as DiffMatchPatch } from 'diff-match-patch';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { simplifyCaseOfAction } from '../utils';

const defaultInfo = {
    bill: {
        name: '',
        billNo: '',
        pdfUrl: '',
        billOrg: '',
        billProposer: '',
        billCosignatory: '',
        caseOfAction: ''
    },
    descriptions: []
};

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        deleteInner: {
            color: '#555555'
        },
        deleteOuter: {
            padding: 2,
            color: theme.palette.primary.main,
            textDecoration: 'line-through'
        },
        add: {
            color: theme.palette.primary.main
        }
    })
);

const ChangedBill = ({
    index,
    activeLaw,
    reviseLaw
}: {
    index: number;
    activeLaw: string;
    reviseLaw: string;
}) => {
    const classes = useStyle();
    const dmp = new DiffMatchPatch();
    const diff = dmp.diff_main(activeLaw, reviseLaw);
    const diff_html = diff.map(d => {
        if (d[0] === -1) {
            return (
                <span className={classes.deleteOuter}>
                    <span className={classes.deleteInner}>{d[1]}</span>
                </span>
            );
        } else if (d[0] === 1) {
            return <span className={classes.add}>{d[1]}</span>;
        } else {
            return <>{d[1]}</>;
        }
    });
    return (
        <Typography variant="h5">
            {index}. {diff_html}
        </Typography>
    );
};

const BillDialog = ({
    id,
    open,
    handleClose
}: {
    id: string;
    open: boolean;
    handleClose: () => void;
}) => {
    const [info, setInfo] = React.useState(defaultInfo);
    React.useEffect(() => {
        fetch(`/api/bill/${id}`)
            .then(res => res.json())
            .then(setInfo);
    }, [id]);

    const proposerType = '立委提案';
    const bill = info.bill;
    const descriptions = info.descriptions;

    const personalPropose = (
        <>
            <Typography variant="h5">提案</Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" py={1}>
                {bill.billProposer.split('；').map(name => (
                    <Box flexShrink={0} pr={1} key={name}>
                        <Typography variant="h5" color="textSecondary">
                            {name}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Typography variant="h5">連署</Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" py={1}>
                {bill.billCosignatory.split('；').map(name => (
                    <Box flexShrink={0} pr={1} key={name}>
                        <Typography variant="h5" color="textSecondary">
                            {name}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </>
    );

    const cosignatoryPropose = (
        <>
            <Typography variant="h4">提案黨團：</Typography>
            <Box py={1} pr={1}>
                {bill.billOrg}
            </Box>
        </>
    );

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Typography variant="h3" gutterBottom>
                        {bill.name}
                    </Typography>
                    <Box my={2}>
                        <Typography
                            variant="h5"
                            color="textSecondary"
                            gutterBottom
                        >
                            {bill.billNo
                                ? bill.billNo.substring(0, 3) +
                                  '/' +
                                  bill.billNo.substring(3, 5) +
                                  '/' +
                                  bill.billNo.substring(5, 7) +
                                  ' ' +
                                  '提案'
                                : ''}
                        </Typography>
                    </Box>
                    <Box my={2}>
                        <Typography variant="h3">提案 / 連署人</Typography>
                    </Box>
                    {proposerType === '立委提案'
                        ? personalPropose
                        : cosignatoryPropose}

                    <Box my={2}>
                        <Typography variant="h3">案由</Typography>
                    </Box>
                    <Box my={2}>
                        <Typography variant="h5" color="textSecondary">
                            {simplifyCaseOfAction(bill.caseOfAction)}
                        </Typography>
                    </Box>
                    <Box my={2}>
                        <Typography variant="h3">修正條文</Typography>
                    </Box>
                    {descriptions.map((description, i) => (
                        <ChangedBill key={i} index={i + 1} {...description} />
                    ))}
                    <Box my={2}>
                        <Typography variant="h3">修正說明</Typography>
                    </Box>
                    {descriptions.map(
                        (description: { description: string }, i) => (
                            <Typography variant="h5">
                                {i + 1}. {description.description}
                            </Typography>
                        )
                    )}
                    <Box display="flex" justifyContent="flex-end" mb={1} mx={1}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleClose}
                        >
                            關閉
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BillDialog;
