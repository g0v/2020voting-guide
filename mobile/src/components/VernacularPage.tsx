import React from 'react';
import {
    Typography,
    Grid,
    Button,
    Container,
    TextField,
    Box
} from '@material-ui/core';
import ChangedBill from './Bill/ChangedBill';
import { simplifyCaseOfAction } from '../utils';

interface VernacularPage {
    match: {
        params: {
            billNo: string;
        };
    };
}

const defaultBillInfo = {
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

const VernacularPage = ({ match }: VernacularPage) => {
    const { billNo } = match.params;

    const [billInfo, setInfo] = React.useState(defaultBillInfo);
    React.useEffect(() => {
        fetch(`/api/bill/${billNo}`)
            .then(res => res.json())
            .then(setInfo);
    }, [billNo]);

    const { bill, descriptions } = billInfo;

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item lg={12} />
                <Grid item lg={12}>
                    <Typography variant="h3">{bill.name}</Typography>
                </Grid>
                <Grid item lg={12}>
                    <Box my={2}>
                        <Typography variant="h3">案由</Typography>
                    </Box>
                    <Box my={2}>
                        <Typography variant="h5" color="textSecondary">
                            {simplifyCaseOfAction(bill.caseOfAction)}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={9}>
                    <Box my={2}>
                        <Typography variant="h3">修正條文</Typography>
                    </Box>
                    <Box my={2}>
                        {descriptions.map(
                            (
                                description: {
                                    index: number;
                                    activeLaw: string;
                                    reviseLaw: string;
                                    description: string;
                                },
                                i
                            ) => (
                                <>
                                    <ChangedBill
                                        key={i}
                                        index={i + 1}
                                        {...description}
                                    />
                                    <Typography variant="h5" color="textSecondary">
                                        修正說明：{description.description}
                                    </Typography>
                                </>
                            )
                        )}
                    </Box>
                </Grid>
                <Grid item lg={3}>
                    <TextField
                        id="outlined-multiline-static"
                        label="白話文"
                        rows="10"
                        defaultValue="我是白話文內容"
                        margin="normal"
                        variant="outlined"
                        multiline
                        fullWidth
                    />
                    <Button variant="contained" color="primary">
                        儲存
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default VernacularPage;
