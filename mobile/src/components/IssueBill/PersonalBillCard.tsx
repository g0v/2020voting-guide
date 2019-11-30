import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { simplifyCaseOfAction } from '../../utils';
import Card from '../Card';
import BillDialog from './BillDialog';

const useStyles = makeStyles({
    billInfo: {
        maxHeight: '5em',
        overflow: 'hidden'
    }
});

const PersonalBillCard = ({
    name,
    billNo,
    description,
    caseOfAction,
    billProposerString,
    billCosignatoryString,
    proposerType
}: {
    name: string;
    billNo: string;
    description: string;
    caseOfAction: string;
    billProposerString: string;
    billCosignatoryString: string;
    proposerType: string;
}) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles(open);
    return (
        <Card key={name}>
            <Box
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <Typography variant="h5" color="textSecondary">
                    立委提案
                </Typography>
                <Box height={12} />
                <Typography variant="h3">{name}</Typography>
                <Box my={1}>
                    <div
                        className={classes.billInfo}
                    >
                        <Typography variant="h4" color="textSecondary">
                            {description
                                ? description
                                : simplifyCaseOfAction(caseOfAction)}
                        </Typography>
                    </div>
                </Box>
                {open ? (
                    <BillDialog
                        id={billNo}
                        open={open}
                        handleClose={() => {
                            setOpen(false);
                        }}
                    />
                ) : null}
            </Box>
        </Card>
    );
};

export default PersonalBillCard;
