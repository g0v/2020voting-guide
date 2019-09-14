import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { Box, Avatar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    photo: {
        width: 76,
        height: 76,
        fontSize: 40
    }
});

export interface NavProps {
    name: string;
    county: string;
    constituency: string;
}

const Nav = ({ name, county, constituency }: NavProps) => {
    const classes = useStyles();
    return (
        <>
            <Box m={1}>
                <Box display="flex" alignItems="center" my={1}>
                    <Link href={`/regional/${county}/${constituency}`}>
                        <KeyboardArrowLeft fontSize="large" />
                    </Link>
                    <Box>
                        <Typography variant="h3" display="inline">
                            {`${name} `}
                        </Typography>
                        <Typography variant="h5" display="inline">
                            {constituency}
                        </Typography>
                    </Box>
                </Box>
                <Box px={1} py={1}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <Avatar
                                className={classes.photo}
                                src="https://upload.wikimedia.org/wikipedia/commons/7/7e/%E6%BD%98%E5%BB%BA%E5%BF%97_%286%29.JPG"
                            />
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h5">
                                        民主進步黨
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">52歲</Typography>
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
