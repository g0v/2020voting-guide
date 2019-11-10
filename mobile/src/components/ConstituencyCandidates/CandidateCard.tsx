import { Avatar, Box, Divider, Grid, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { RectangleIcon } from '../PartyIcon';

const useStyles = makeStyles({
    photo: {
        width: 76,
        height: 76,
        fontSize: 40
    }
});

export interface CandidateProps {
    id: string;
    name: string;
    picUrl: string;
    party: string;
    experience: string;
}

export const CandidateCard = ({
    name,
    party,
    picUrl,
    experience
}: CandidateProps) => {
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
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item>
                                            <Typography variant="h6">
                                                {name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <RectangleIcon party={party} />
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
