import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Typography,
    Box
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Bill } from './IssueBill';

const defaultInfo = {
    bill: {
        name: '',
        billNo: '',
        pdfUrl: '',
        billOrg: '',
        billProposer: '',
        billCosignatory: '',
        caseOfAction: ''
    }
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
    const theme = useTheme();

    const [info, setInfo] = React.useState(defaultInfo);
    React.useEffect(() => {
        fetch(`/api/bill/${id}`)
            .then(res => res.json())
            .then(setInfo);
    }, [id]);

    const proposerType = '立委提案';
    const bill = info.bill;

    const personalPropose = (
        <>
            <Typography variant="h5">提案：</Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" py={1}>
                {bill.billProposer.split('；').map(name => (
                    <Box flexShrink={0} px={1} key={name}>
                        <Typography variant="h5" color="textSecondary">
                            {name}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Typography variant="h5">連署：</Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" py={1}>
                {bill.billCosignatory.split('；').map(name => (
                    <Box flexShrink={0} px={1} key={name}>
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
            <Box py={1} px={1}>
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
                                ? bill.billNo.substring(0, 4) +
                                  '/' +
                                  bill.billNo.substring(4, 6) +
                                  '/' +
                                  bill.billNo.substring(6, 8) +
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
                    <Typography variant="h5" color="textSecondary">
                        {bill.caseOfAction}
                    </Typography>
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
