import React from 'react';
import {
    Typography,
    Grid,
    Button,
    Container,
    TextField,
    Box
} from '@material-ui/core';
import ChangedBill from '../Bill/ChangedBill';
import { simplifyCaseOfAction } from '../../utils';

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
        caseOfAction: '',
        vernacular: ''
    },
    descriptions: []
};

const VernacularPage = ({ match }: VernacularPage) => {
    const { billNo } = match.params;
    const hash = 'g0v2020'
    const [billInfo, setInfo] = React.useState(defaultBillInfo);
    React.useEffect(() => {
        fetch(`/api/vernacular/${billNo}`)
            .then(res => res.json())
            .then(res => {
                setInfo(res);
                setVernacular(res.bill.vernacular);
            });
    }, [billNo]);

    const { bill, descriptions } = billInfo;
    const [vernacular, setVernacular] = React.useState(bill.vernacular);
    const postVernacular = () => {
        const form = new FormData();
        form.append('secret', hash);
        form.append('msg', vernacular);
        fetch(`/api/vernacular/${billNo}`, {
            method: 'POST',
            body: form
        }).then(()=>alert('已儲存'));
    };

    return (
        <Container maxWidth="md">
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
                        <Typography variant="h6" color="textSecondary">
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
                                    <Typography
                                        variant="h6"
                                        color="textSecondary"
                                    >
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
                        value={vernacular}
                        onChange={event => {
                            setVernacular(event.target.value);
                        }}
                        margin="normal"
                        variant="outlined"
                        multiline
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={postVernacular}
                    >
                        儲存
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default VernacularPage;
