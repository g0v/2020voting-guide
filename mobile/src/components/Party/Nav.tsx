import { Avatar, Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';

const useStyles = makeStyles({
    photo: {
        width: 76,
        height: 76,
        fontSize: 40
    }
});

export interface Props {
    name: string;
    logo: string;
    regionalSittingNum: number;
    nonRegionalSittingNum: number;
    voteRate: string;
}

const Nav: FunctionComponent<Props> = ({
    name,
    logo,
    regionalSittingNum,
    nonRegionalSittingNum,
    voteRate
}) => {
    const classes = useStyles();
    return (
        <Box m={1}>
            <Box px={1} py={1}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <Avatar className={classes.photo} src={logo} />
                    </Grid>
                    <Grid item>
                        <Grid container spacing={1} direction="column">
                            <Grid item>
                                <Typography variant="h5" color="textSecondary">
                                    上屆政黨得票率 {voteRate}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" color="textSecondary">
                                    {`現任不分區 ${nonRegionalSittingNum} 席 區域立委 ${regionalSittingNum} 席`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Nav;
