import { Avatar, Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { RectangleIcon } from '../PartyIcon';

const useStyles = makeStyles({
    nav: {
        position: 'sticky',
        top: '56px',
        background: '#fff',
        zIndex: 1
    },
    photo: {
        width: 76,
        height: 76,
        fontSize: 40
    }
});

interface Nav {
    name?: string;
    county?: string;
    constituency?: string;
    photo?: string;
    party?: string;
    age?: number;
    padding?: object;
}

const Nav = ({ name = '', photo = '', age = 0, party = '', padding = {} }: Nav) => {
    const classes = useStyles();
    const ageDisplay = age === 0 ? '未知年齡' : `${age} 歲`;
    return (
        <div style={padding}>
            <Box m={1}>
                <Box px={1} py={1}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            {photo ? (
                                <Avatar src={photo} className={classes.photo} />
                            ) : (
                                <Avatar className={classes.photo}>{name.charAt(0)}</Avatar>
                            )}
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item>
                                    <RectangleIcon party={party} />
                                </Grid>
                                <Box height={8} />
                                <Grid item>
                                    <Typography variant="h5" color="textSecondary">
                                        {ageDisplay}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
};

export default Nav;
