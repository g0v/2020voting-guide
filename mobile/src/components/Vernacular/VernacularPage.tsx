import { Box, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import { simplifyCaseOfAction } from '../../utils';
import ChangedBill from '../Bill/ChangedBill';

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
        docUrl: '',
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
    const theme = useTheme();
    const hash = 'g0v2020';
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
        }).then(() => alert('已儲存'));
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={3}>
                <Grid item lg={12} />
                <Grid item lg={12}>
                    <Typography variant="h2">{bill.name}</Typography>
                </Grid>
                <Grid item lg={12}>
                    <Box my={2}>
                        <Typography variant="h3">案由</Typography>
                    </Box>
                    <Box my={2}>
                        <Typography variant="h6" color="textSecondary">
                            {bill.pdfUrl
                                ? simplifyCaseOfAction(bill.caseOfAction)
                                : '請參考 PDF 原檔'}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={9}>
                    <Box my={2}>
                        <Typography variant="h3">修正條文</Typography>
                    </Box>
                    <Box my={2}>
                        {descriptions.length ? (
                            descriptions.map(
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
                                        <Box
                                            p={1}
                                            mt={1}
                                            mb={3}
                                            bgcolor={
                                                theme.palette.background.default
                                            }
                                            borderLeft={`3px solid ${theme.palette.primary.main}`}
                                        >
                                            <Typography
                                                variant="h6"
                                                color="textSecondary"
                                            >
                                                修正說明
                                                <br />
                                                {description.description}
                                            </Typography>
                                        </Box>
                                    </>
                                )
                            )
                        ) : (
                            <>
                                <Typography variant="h6" color="textSecondary">
                                    你發現了一個新條文，所以沒有修正條文對照，請直接參考案由或是看原文
                                    PDF！
                                </Typography>
                            </>
                        )}
                    </Box>
                    <Box my={2}>
                        <Button
                            href={bill.pdfUrl || bill.docUrl}
                            variant="contained"
                            color="primary"
                            target="_blank"
                        >
                            原文PDF
                        </Button>
                    </Box>
                </Grid>
                <Grid item lg={3}>
                    <TextField
                        id="outlined-multiline-static"
                        label="白話文"
                        rows="20"
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
