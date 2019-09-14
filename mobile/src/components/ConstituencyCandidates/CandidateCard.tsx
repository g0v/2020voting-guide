import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Grid from '@material-ui/core/Grid';

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
            <ListItem
                button
                component="a"
                href={`/candidate?county=${county}&constituency=${constituency}`}
            >
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
