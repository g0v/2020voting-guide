import { Avatar, Box, Grid } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import county_constituency from '../../data/county_constituency.json';
import { RectangleIcon } from '../PartyIcon';

const useStyles = makeStyles({
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

const Nav = ({
    name = '',
    constituency = '',
    photo = '',
    age = 0,
    party = '',
    padding = {}
}: Nav) => {
    const classes = useStyles();
    const ageDisplay = age === 0 ? '未知年齡' : `${age} 歲`;
    const county_list = county_constituency.filter(county =>
        county.area.includes(constituency)
    );
    const county = county_list.length ? county_list[0].name : '';
    return (
        <div style={padding}>
            <Box m={1}>
                <Box display="flex" alignItems="center" my={1}>
                    <Link href={`/regional/${county}/${constituency}`}>
                        <KeyboardArrowLeft fontSize="large" />
                    </Link>
                    <Box>
                        <Typography
                            variant="h3"
                            display="inline"
                            color="textPrimary"
                        >
                            {`${name} `}
                        </Typography>
                        <Typography
                            variant="h5"
                            display="inline"
                            color="textSecondary"
                        >
                            {constituency}
                        </Typography>
                    </Box>
                </Box>
                <Box px={1} py={1}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            {photo ? (
                                <Avatar src={photo} className={classes.photo} />
                            ) : (
                                <Avatar className={classes.photo}>
                                    {name.charAt(0)}
                                </Avatar>
                            )}
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item>
                                    <RectangleIcon party={party} />
                                </Grid>
                                <Box height={8} />
                                <Grid item>
                                    <Typography
                                        variant="h5"
                                        color="textSecondary"
                                    >
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
