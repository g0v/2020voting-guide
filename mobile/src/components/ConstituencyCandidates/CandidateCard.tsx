import {
    Avatar,
    Box,
    Divider,
    Grid,
    ListItem,
    ListItemText,
    Typography,
    Card,
    CardContent,
    CardActionArea
} from '@material-ui/core';
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

/**
 * /regional/臺北市/臺北市第一選舉區
 * 候選人 ListItem
 */
const CandidateCard = ({
    name,
    party,
    photo,
    experience,
    constituency,
    currentLegislator
}: CandidateProps) => {
    const classes = useStyles();
    return isMobile ? (
        <>
            <ListItem
                button
                component="a"
                className="candidate-card"
                href={`/candidate/${constituency}/${name}`}
            >
                <ListItemText
                    className="candidate-card__inner transition"
                    primary={
                        <div className="m-3 d-flex">
                            <div className="mr-3">
                                <Avatar src={photo} className={classes.photo}>
                                    {name.charAt(0)}
                                </Avatar>
                            </div>
                            <div className="d-flex flex-column">
                                <Grid container alignItems="center" spacing={1}>
                                    <div className="h3 text-overflow-1 mb-1">
                                        {name}
                                    </div>
                                    <Grid container alignItems="center">
                                        <RectangleIcon party={party} />
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
                                                    <Typography
                                                        variant="h4"
                                                        color="textSecondary"
                                                        display="inline"
                                                    >
                                                        現任
                                                    </Typography>
                                                </>
                                            ) : null}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Box py={1}>
                                        <div className="h4 text-overflow-1 color-gray">
                                            {experience.split(/;|\n| /)[0]}
                                        </div>
                                    </Box>
                                </Grid>
                            </div>
                        </div>
                    }
                ></ListItemText>
            </ListItem>
            <Divider />
        </>
    ) : (
        <Card className={classes.cardContainer}>
            <CardActionArea
                component="a"
                href={`/candidate/${constituency}/${name}`}
                className={classes.cardActionContainer}
            >
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
                                <Typography
                                    variant="h4"
                                    color="textSecondary"
                                    display="inline"
                                >
                                    現任
                                </Typography>
                            </>
                        ) : null}
                    </Box>
                    <Avatar src={photo} className={classes.desktopPhoto}>
                        {name.charAt(0)}
                    </Avatar>
                    <div
                        className="h3 mb-1"
                        style={{ textAlign: 'center', lineHeight: 1.2 }}
                    >
                        {name}
                    </div>
                    <Typography
                        variant="h4"
                        color="textSecondary"
                        noWrap
                        align="center"
                    >
                        {experience.split(/;|\n| /)[0]}
                    </Typography>
                    <Grid item className={classes.desktopRectangleIcon}>
                        <RectangleIcon party={party} />
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

const areEqual = (prevProps: CandidateProps, nextProps: CandidateProps) => {
    return prevProps.id === nextProps.id;
};
export default React.memo(CandidateCard, areEqual);
