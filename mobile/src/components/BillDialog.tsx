import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    Typography,
    Box
} from '@material-ui/core';

const defaultInfo = {
    bill: {
        name: '',
        pdfUrl: '',
        billProposer: '',
        billCosignatory: ''
    }
};

const BillDialog = ({ id }: { id: string }) => {
    const [billInfo, setBillInfo] = React.useState(defaultInfo);
    React.useEffect(() => {
        fetch(`/api/bill/${id}`)
            .then(res => res.json())
            .then(setBillInfo);
    }, [id]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = (value: string) => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="text" color="primary" onClick={handleOpen}>
                詳細資料
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{billInfo.bill.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="h4">主提案：</Typography>
                        <Box
                            display="flex"
                            flexDirection="row"
                            flexWrap="wrap"
                            py={1}
                        >
                            {billInfo.bill.billProposer
                                .split('；')
                                .map(name => (
                                    <Box flexShrink={0} px={1}>
                                        {name}
                                    </Box>
                                ))}
                        </Box>
                        <Typography variant="h4">連署：</Typography>
                        <Box
                            display="flex"
                            flexDirection="row"
                            flexWrap="wrap"
                            py={1}
                        >
                            {billInfo.bill.billCosignatory
                                .split('；')
                                .map(name => (
                                    <Box flexShrink={0} px={1}>
                                        {name}
                                    </Box>
                                ))}
                        </Box>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BillDialog;
