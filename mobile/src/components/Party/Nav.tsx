import { Avatar, Box, Grid } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
    photo: {
        width: 76,
        height: 76,
        fontSize: 40
    }
});

export interface NavProps {
    name: string;
    logo: string;
    regionalSittingNum: number;
    nonRegionalSittingNum: number;
}

const Nav = ({
    name,
    logo,
    regionalSittingNum,
    nonRegionalSittingNum
}: NavProps) => {
    const classes = useStyles();
    return (
        <>
            <Box m={1}>
                <Box display="flex" alignItems="center" my={1}>
                    <Link href={`/party`}>
                        <KeyboardArrowLeft fontSize="large" />
                    </Link>
                    <Box>
                        <Typography variant="h3" display="inline">
                            {`${name} `}
                        </Typography>
                    </Box>
                </Box>
                <Box px={1} py={1}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <Avatar className={classes.photo} src={logo} />
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h5">
                                        現任不分區立委 {regionalSittingNum} 席
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">
                                        區域立委 {nonRegionalSittingNum} 席
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default Nav;
