import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { simplifyCaseOfAction } from '../../utils';
import Card from '../Card';
import BillDialog from './BillDialog';
import BillStatus from './BillStatus';
import { gaEvent } from '../../utils';

const useStyles = makeStyles({
    billInfo: {
        display: '-webkit-box',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        '-webkit-line-clamp': 4,
        '-webkit-box-orient': 'vertical'
    },
    cardName: {
        display: '-webkit-box',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical'
    }
});

const PersonalBillCard = ({
    name,
    billNo,
    caseOfAction,
    vernacular,
    billProposerString,
    billCosignatoryString,
    proposerType,
    billStatus
}: {
    name: string;
    billNo: string;
    vernacular: string;
    caseOfAction: string;
    billProposerString: string;
    billCosignatoryString: string;
    proposerType: string;
    billStatus: string;
}) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles(open);

    return (
        <Card key={name}>
            <Box
                onClick={() => {
                    if (!open) {
                        gaEvent('legislator', 'browse', 'lawDetail');
                    }
                    setOpen(!open);
                }}
            >
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography variant="h5" color="textSecondary">
                            {proposerType}
                        </Typography>
                    </Box>
                    <BillStatus status={billStatus} />
                </Box>
                <Box height={12} />
                <Typography variant="h3" className={classes.cardName}>
                    {vernacular ? vernacular : name}
                </Typography>
                <Box my={1}>
                    <Typography
                        variant="h4"
                        color="textSecondary"
                        className={classes.billInfo}
                    >
                        {vernacular ? name : simplifyCaseOfAction(caseOfAction)}
                    </Typography>
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
