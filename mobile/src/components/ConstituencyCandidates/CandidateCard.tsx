import { Avatar, Box, Divider, Grid, ListItem, ListItemText, Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { RectangleIcon } from '../PartyIcon';

const useStyles = makeStyles({
    photo: {
        width: 76,
        height: 76,
        fontSize: 40
    },
    desktopPhoto: {
        width: 120,
        height: 120,
        fontSize: 40,
        margin: '0 auto 10px auto'
    },
    desktopRectangleIcon: {
        width: 150,
        position: 'absolute',
        bottom: 20,
        right: '20%'
    },
    cardContainer: {
        width: '250px',
        height: '290px',
        margin: '30px 30px 0 0',
        position: 'relative'
    },
    cardActionContainer: {
        position: 'initial'
    }
});

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

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
    return isMobile ? 
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
    </> : 
    <Card className={classes.cardContainer}>
        <CardActionArea component="a" href={`/candidate/${constituency}/${name}`} className={classes.cardActionContainer}>
            <CardContent>
                <Box height={25}>
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
                </Box>
                {photo ? (
                    <Avatar
                        src={photo}
                        className={classes.desktopPhoto}
                    />
                ) : (
                    <Avatar className={classes.desktopPhoto}>
                        {name.charAt(0)}
                    </Avatar>
                )}
                <Typography variant="h3" align='center'>
                    {name}
                </Typography>
                <Typography
                    variant="h4"
                    color="textSecondary"
                    noWrap
                    align='center'
                >
                    {experience.split(/;|\n| /)[0]}
                </Typography>
                <Grid item className={classes.desktopRectangleIcon}>
                    <RectangleIcon party={party}/>
                </Grid>
            </CardContent>
        </CardActionArea>
    </Card>
};
