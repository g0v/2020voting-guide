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

interface Party {
    id: string;
    name: string;
    emblem: string;
}

export interface CandidateProps {
    id: string;
    name: string;
    picUrl: string;
    party: Party;
    experience: string;
    county: string;
    constituency: string;
}

export const CandidateCard: React.FunctionComponent<CandidateProps> = ({
    name,
    party,
    county,
    picUrl,
    constituency,
    experience
}) => {
    const classes = useStyles();
    return (
        <>
            <ListItem button component="a" href={`/candidate/${name}`}>
                <ListItemText
                    primary={
                        <Grid container>
                            <Grid item>
                                {picUrl ? (
                                    <Avatar
                                        src={picUrl}
                                        className={classes.photo}
                                    />
                                ) : (
                                    <Avatar className={classes.photo}>
                                        {name.charAt(0)}
                                    </Avatar>
                                )}
                            </Grid>
                            <Grid item>
                                <Box m={1}>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography variant="h6">
                                                {name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="button">
                                                {party}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Typography variant="button">
                                            第九屆立法委員
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
