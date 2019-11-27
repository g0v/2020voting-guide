import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { simplifyCaseOfAction } from '../../utils';
import Card from '../Card';
import BillDialog from './BillDialog';
import { RelatePerson, useStyles } from './index';

const PersonalBillCard = ({ name, billNo, description, caseOfAction, billProposerString, billCosignatoryString, proposerType }: {
    name: string;
    billNo: string;
    description: string;
    caseOfAction: string;
    billProposerString: string;
    billCosignatoryString: string;
    proposerType: string;
}) => {
    const [open, setOpen] = React.useState(false);
    const [openDetail, setOpenDetail] = React.useState(false);
    const classes = useStyles(open);
    return (<Card key={name}>
        <Typography variant="h5" color="textSecondary">立委提案</Typography>
        <Box height={12} />
        <Typography variant="h3" onClick={() => {
            setOpen(!open);
        }}>
            {name}
        </Typography>
        <Box my={1}>
            <div className={classes.billInfo} onClick={() => {
                setOpen(!open);
            }}>
                <Typography variant="body2" color="textSecondary">
                    {description
                        ? description
                        : simplifyCaseOfAction(caseOfAction)}
                </Typography>
            </div>
            {open ? (<RelatePerson proposer={billProposerString} cosignatory={billCosignatoryString} />) : null}
            {open ? (<Box my={1}>
                <Button variant="outlined" color="primary" onClick={() => {
                    setOpenDetail(!openDetail);
                }}>
                    詳細法案
                        </Button>
            </Box>) : null}
        </Box>
        {openDetail ? (<BillDialog id={billNo} open={openDetail} handleClose={() => {
            setOpenDetail(false);
        }} />) : null}
    </Card>);
};

export default PersonalBillCard