import { List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Card from '../Card';
import BillDialog from './BillDialog';
import { Bill } from './index';

const useStyles = makeStyles({
    billName: {
        display: '-webkit-box',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical'
    }
});

const CaucusBill = ({ billNo, name, vernacular }: Bill) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    return (
        <>
            <ListItem
                divider
                className="caucus-card-item"
                onClick={() => {
                    setOpen(true);
                }}
            >
                <Typography variant="h4" className={classes.billName}>
                    {vernacular ? vernacular : name}
                </Typography>
            </ListItem>
            {open ? (
                <BillDialog
                    id={billNo}
                    open={open}
                    handleClose={() => {
                        setOpen(false);
                    }}
                />
            ) : null}
        </>
    );
};

const CaucusBillCard = ({ bills }: { bills: Bill[] }) => (
    <Card>
        <Typography variant="h5" color="textSecondary">
            {bills[0].billOrg.replace('本院', '').replace('黨團', '')} 黨團提案
        </Typography>
        <List>
            {bills.map(bill => (
                <CaucusBill {...bill} />
            ))}
        </List>
    </Card>
);

export default CaucusBillCard;
