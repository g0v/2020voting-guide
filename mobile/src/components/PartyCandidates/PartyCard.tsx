import {
    Box,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItem,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Seats from '../Party/Seats';
import React from 'react';

const useStyles = makeStyles({
    photo: {
        width: '72px',
        height: '72px',
        backgroundPosition: 'center',
        backgroundCover: 'cover',
        marginRight: '20px'
    },
    dot: {
        color: '#42B72A'
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

const Name = ({ name }: { name: string }) => (
    <Typography variant="h4"> {name} </Typography>
);

const VoteRate = ({ rate }: { rate: string }) => (
    <Typography variant="body2" color="textSecondary">
        上屆得票率 {rate}
    </Typography>
);

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
        <ListItem divider button component="a" href={`party/${name}`}>
            <ListItemAvatar>
                <Avatar src={logo} className={classes.photo} />
            </ListItemAvatar>
            <Box>
                <ListItemText>
                    <Box mb={1} display="flex" alignItems="center">
                        <Name name={name} />
                        {electedPersonNum > 0 && (
                            <Seats num={electedPersonNum} />
                        )}
                    </Box>
                    <VoteRate rate={voteRate} />
                </ListItemText>
            </Box>
        </ListItem>
    );
};
export default PartyCard;
