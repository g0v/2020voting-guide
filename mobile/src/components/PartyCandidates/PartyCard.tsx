import {
    Avatar,
    Box,
    Divider,
    Grid,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
    photo: {
        width: 76,
        height: 76,
        fontSize: 40
    }
});

interface PartyCard {
    name: string;
    chairman: string[];
    logo: string;
    voteNum: number;
    voteRate: string;
    electedPersonNum: number;
    electedPerson: string[];
}

const PartyCard = ({
    name,
    chairman,
    logo,
    voteNum,
    voteRate,
    electedPersonNum,
    electedPerson
}: PartyCard) => {
    const classes = useStyles();
    return (
        <>
            <ListItem button component="a" href={`/party/${name}`}>
                <ListItemText
                    primary={
                        <Grid container>
                            <Grid item>
                                <Avatar src={logo} className={classes.photo} />
                            </Grid>
                            <Grid item>
                                <Box m={1}>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography variant="h4">
                                                {name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Typography variant="button">
                                            上屆得票率 {voteRate} 不分區{' '}
                                            {electedPersonNum} 席
                                        </Typography>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    }
                ></ListItemText>
            </ListItem>
            <Divider />
        </>
    );
};
export default PartyCard;
