import { Box, Button, Dialog, DialogContent, Typography } from '@material-ui/core';
import React from 'react';
import { simplifyCaseOfAction } from '../../utils';
import ChangedBill from '../Bill/ChangedBill';
import { CircleIcon } from '../PartyIcon';

const defaultInfo = {
    bill: {
        name: '',
        billNo: '',
        pdfUrl: '',
        billOrg: '',
        billProposer: [],
        billCosignatory: [],
        caseOfAction: '',
        proposerType: ''
    },
    descriptions: []
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

    const bill = info.bill;
    const descriptions = info.descriptions;

    const personalPropose = (
        <>
            <Typography variant="h4">提案</Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" py={1}>
                {bill.billProposer.map(({ name, party }) => (
                    <Box flexShrink={0} pr={2.5} key={name}>
                        <Typography variant="h4" color="textSecondary" display="inline">
                            {name}
                        </Typography>
                        <CircleIcon party={party} />
                    </Box>
                ))}
            </Box>
            <Typography variant="h4">連署</Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" py={1}>
                {bill.billCosignatory.map(({ name, party }) => (
                    <Box flexShrink={0} pr={2.5} key={name}>
                        <Typography variant="h4" color="textSecondary" display="inline">
                            {name}
                        </Typography>
                        <CircleIcon party={party} />
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
                            variant="h4"
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
                        <Typography variant="h3">案由</Typography>
                    </Box>
                    <Box my={2}>
                        <Typography variant="h4" color="textSecondary">
                            {simplifyCaseOfAction(bill.caseOfAction)}
                        </Typography>
                    </Box>

                    <Box my={2}>
                        <Typography variant="h3">提案 / 連署人</Typography>
                    </Box>
                    {bill.proposerType === '立委提案'
                        ? personalPropose
                        : cosignatoryPropose}

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
                            <Typography variant="h4">
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
