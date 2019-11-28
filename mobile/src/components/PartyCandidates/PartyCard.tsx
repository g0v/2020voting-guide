import { Box, ListItemAvatar, Avatar, ListItemText, ListItem, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
    photo: {
        width: "75%",
        height: "75%",
        marginRight: "20px",
    },
    dot: {
        color: "#42B72A",
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

const Name = ({ name }: { name: string }) => <Typography variant="h4"> {name} </Typography>

const Seats = ({ num }: { num: number }) => {
    const classes = useStyles();
    return (
        <Box ml={1.5} display="flex" alignItems="center">
            <FiberManualRecordIcon className={classes.dot} fontSize="small" />
            <Typography variant="body2" color="textSecondary">
                不分區{num} 席
            </Typography>
        </Box>
    )
}

const VoteRate = ({ rate }: { rate: string }) =>
    <Typography variant="body2" color="textSecondary">
        上屆得票率 {rate}
    </Typography>

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
        <ListItem divider button component="a" href={`/progressing`}>
            <ListItemAvatar>
                <Avatar src={logo} className={classes.photo} />
            </ListItemAvatar>
            <Box>
                <ListItemText >
                    <Box mb={1} display="flex" alignItems="center">
                        <Name name={name} />
                        {electedPersonNum > 0 && <Seats num={electedPersonNum} />}
                    </Box>
                    <VoteRate rate={voteRate} />
                </ListItemText>
            </Box>
        </ListItem >
    );
};
export default PartyCard;
