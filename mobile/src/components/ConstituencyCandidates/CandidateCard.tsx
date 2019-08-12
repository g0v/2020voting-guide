import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    photo: {
        width: 76,
        height: 76,
        borderRadius: '50%'
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
    photo: string;
    party: Party;
    experience: string;
    county: string;
    constituency: string;
}

export const CandidateCard: React.FunctionComponent<CandidateProps> = ({
    name,
    party,
    county,
    constituency,
    experience
}) => {
    const classes = useStyles();

    return (
        <Link href={`/candidate?county=${county}&constituency=${constituency}`}>
            <Card>
                <CardActionArea>
                    <Box m={1.5}>
                        <Grid container>
                            <Grid item>
                                <img
                                    className={classes.photo}
                                    src="https://upload.wikimedia.org/wikipedia/commons/0/01/Wan-An_Jiang_Portrait_20150613.jpg"
                                    alt="candidate"
                                />
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
                    </Box>
                </CardActionArea>
            </Card>
        </Link>
    );
};
