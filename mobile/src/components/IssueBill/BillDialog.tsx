import { Box, DialogContent, Link, Typography } from '@material-ui/core';
import React from 'react';
import { simplifyCaseOfAction } from '../../utils';
import Alert from '../Alert';
import ChangedBill from '../Bill/ChangedBill';
import Dialog from '../Dialog';
import { CircleIcon } from '../PartyIcon';

const defaultInfo = {
    bill: {
        name: '',
        billNo: '',
        pdfUrl: '',
        docUrl: '',
        billOrg: '',
        billProposer: [],
        billCosignatory: [],
        caseOfAction: '',
        proposerType: '',
        vernacular: ''
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
            <Typography variant="h4" gutterBottom>
                提案
            </Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" pb={1}>
                {bill.billProposer.map(({ name, party }) => (
                    <Box flexShrink={0} pr={2.5} key={name}>
                        <Typography
                            variant="h4"
                            color="textSecondary"
                            display="inline"
                        >
                            {name}
                        </Typography>
                        <CircleIcon party={party} />
                    </Box>
                ))}
            </Box>
            <Typography variant="h4" gutterBottom>
                連署
            </Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" pb={1}>
                {bill.billCosignatory.map(({ name, party }) => (
                    <Box flexShrink={0} pr={2.5} key={name}>
                        <Typography
                            variant="h4"
                            color="textSecondary"
                            display="inline"
                        >
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
            <Typography variant="h4" color="textSecondary">
                {bill.billOrg}
            </Typography>
        </>
    );

    const modifyBill = (
        <>
            {descriptions.map((description, i) => (
                <ChangedBill key={i} index={i + 1} {...description} />
            ))}
            <Box my={2}>
                <Typography variant="h3">修正說明</Typography>
            </Box>
            {descriptions.map((description: { description: string }, i) => (
                <Typography variant="h4">
                    {i + 1}. {description.description}
                </Typography>
            ))}
        </>
    );
    const newBill = (
        <Box mt={3}>
            <Alert>
                <Typography variant="h5" color="textSecondary">
                    這是一個新擬定的法案！
                </Typography>
                <Typography variant="h5" color="textSecondary">
                    {'法案詳細條文文件： '}
                    <Link href={bill.pdfUrl || bill.docUrl}>{bill.name}</Link>
                </Typography>
            </Alert>
        </Box>
    );

    return !open ? null : (
        <Dialog
            handleCloseClick={handleClose}
            top={
                <Typography variant="h3" gutterBottom>
                    {bill.name}
                </Typography>
            }
        >
            <DialogContent>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    {bill.vernacular}
                </Typography>
                <Box my={2}>
                    <Typography variant="h4" color="textSecondary" gutterBottom>
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

                <Box my={3}>
                    <Typography variant="h3" gutterBottom>
                        案由
                    </Typography>
                    <Typography variant="h4" color="textSecondary">
                        {simplifyCaseOfAction(bill.caseOfAction)}
                    </Typography>
                </Box>

                <Box my={3}>
                    <Typography variant="h3" gutterBottom>
                        提案 / 連署人
                    </Typography>
                    {bill.proposerType === '立委提案'
                        ? personalPropose
                        : cosignatoryPropose}
                </Box>

                <Box my={3}>
                    <Typography variant="h3" gutterBottom>
                        修正條文
                    </Typography>
                    {descriptions.length ? modifyBill : newBill}
                </Box>
                <Box height={72} />
            </DialogContent>
        </Dialog>
    );
};

export default BillDialog;
