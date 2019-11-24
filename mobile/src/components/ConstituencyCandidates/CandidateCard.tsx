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
    photo: string;
    party: string;
    experience: string;
    constituency: string;
    currentLegislator: boolean;
}

export const CandidateCard = ({
    name,
    party,
    photo,
    experience,
    constituency,
    currentLegislator
}: CandidateProps) => {
    const classes = useStyles();
    return (
        <>
            <ListItem button component="a" href={`/candidate/${constituency}/${name}`}>
                <ListItemText
                    primary={
                        <Box m={1}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    {photo ? (
                                        <Avatar
                                            src={photo}
                                            className={classes.photo}
                                        />
                                    ) : (
                                        <Avatar className={classes.photo}>
                                            {name.charAt(0)}
                                        </Avatar>
                                    )}
                                </Grid>
                                <Grid item spacing={2}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Grid item>
                                            <Typography variant="h3">
                                                {name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <RectangleIcon party={party} />
                                        </Grid>
                                        <Grid item>
                                            {currentLegislator ? (
                                                <>
                                                    <Box
                                                        height={15}
                                                        width={15}
                                                        ml={1}
                                                        borderRadius="50%"
                                                        bgcolor="green"
                                                        display="inline-block"
                                                    />{' '}
                                                    <Typography variant="h4" color="textSecondary" display="inline">
                                                    現任
                                                    </Typography>
                                                </>
                                            ) : null}
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Box py={1} width={230}>
                                            <Typography
                                                variant="h4"
                                                color="textSecondary"
                                                noWrap
                                            >
                                                {experience.split(/;|\n| /)[0]}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                ></ListItemText>
            </ListItem>
            <Divider />
        </>
    );
};
