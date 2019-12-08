import React, { FunctionComponent } from 'react';
import { Typography, Avatar, Box } from '@material-ui/core';
import { Position } from './types';
import Card from '../Card';

interface Props {
    positions: Position[];
	currentPolitics: string,
	lastPolitics: string,
}

const Title: FunctionComponent<{ name: string }> = ({ name }) => (
    <Box ml={2} mb={1} display="flex" alignItems="center">
        <Box
            width="8px"
            height="24px"
            mr={1}
            borderRadius="4px"
            bgcolor="primary.main"
        />
        <Typography variant="h2">{name}</Typography>
    </Box>
);

const PositionCard: FunctionComponent<Position> = ({ name, position }) => (
    <Box flexBasis="50%" display="flex" alignItems="center">
        <Box mx={1} my={2}>
            <Avatar>{name.charAt(0)}</Avatar>
        </Box>
        <Box flexGrow="1">
            <Typography variant="body2" color="textSecondary">
                {position}
            </Typography>
            <Box>{name}</Box>
        </Box>
    </Box>
);

const FullCard: FunctionComponent = ({ children }) => (
    <Box
        py={2}
        px={1}
        mb={2}
        display="flex"
        flexWrap="wrap"
        bgcolor="white"
    >
        {children}
    </Box>
);

// const Candidate: FunctionComponent<Props> = ({ photo ,title, name }) => <Box>

const BasicInfoTab: FunctionComponent<Props> = ({ positions }) => {
    return (
        <Box width="100vw" bgcolor="#F7F7F7" py={3}>
            <Title name="政黨主要職位" />
            <FullCard>
                {positions.map(p => (
                    <PositionCard {...p} />
                ))}
            </FullCard>
            <Title name="政見" />
            <Box p={1}>
                <Card>
                    <Box mb={1}>
                        <Typography variant="body2" color="textSecondary">
                            {`第 10 屆 不分區立委選舉`}
                        </Typography>
                    </Box>
                    <Typography> 本次參選政見 </Typography>
                </Card>
                <Card>
                    <Box mb={1}>
                        <Typography variant="body2" color="textSecondary">
                            {`第 9 屆 不分區立委選舉`}
                        </Typography>
                    </Box>
                    <Typography> 上次參選政見 </Typography>
                </Card>
            </Box>
        </Box>
    );
};

export default BasicInfoTab;
