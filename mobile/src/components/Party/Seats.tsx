import React from 'react';
import { Box, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    dot: {
        color: '#42B72A'
    }
});

const Seats = ({ num }: { num: number }) => {
    const classes = useStyles();
    return (
        <Box ml={1.5} display="flex" alignItems="center">
            <FiberManualRecordIcon className={classes.dot} fontSize="small" />
            <Typography variant="body2" color="textSecondary">
                不分區{num} 席
            </Typography>
        </Box>
    );
};

export default Seats;
