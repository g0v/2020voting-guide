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
        pdfUrl: '',
        billOrg: '',
        billProposer: '',
        billCosignatory: '',
        caseOfAction: ''
    }
};

const BillDialog = ({
    id,
    proposerType,
    bill
}: {
    id: string;
    proposerType: string;
    bill: Bill;
}) => {
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const personalPropose = (
        <>
            <Typography variant="h5" color="textSecondary">
                主提案：
            </Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" py={1}>
                {bill.billProposer.split('；').map(name => (
                    <Box flexShrink={0} px={1} key={name}>
                        <Typography variant="h5" color="textSecondary">
                            {name}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Typography variant="h5" color="textSecondary">
                連署：
            </Typography>
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
            <Button variant="text" color="primary" onClick={handleOpen}>
                詳細資料
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{bill.name}</DialogTitle>
                <Box
                    bgcolor={theme.palette.background.default}
                    px={3}
                    pb={1}
                    pt={2}
                    mb={1}
                >
                    <Typography variant="h5" color="textSecondary">
                        {bill.caseOfAction}
                    </Typography>
                    <Box pt={1}>
                        <Button
                            variant="text"
                            color="primary"
                            target="_blank"
                            href={bill.pdfUrl}
                        >
                            提案全文
                        </Button>
                    </Box>
                </Box>
                <DialogContent>
                    {proposerType === '立委提案'
                        ? personalPropose
                        : cosignatoryPropose}
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
