import { List, Container, Typography, Box } from '@material-ui/core';
import React from 'react';
import parties from '../../data/party.json';
import Navigation from '../Navigation';
import PartyCard from './PartyCard';

const PartyCandidates = () => {
    return (
        <Container className="p-0">
            <Navigation title="不分區參選政黨">
                <Typography variant="subtitle1" color="textSecondary">
                    由得票超過5%的政黨依得票比例來分配34席
                </Typography>
            </Navigation>
            <Box px={2}>
                <List>
                    {parties.map((party, i) => (
                        <>
                            <PartyCard {...party} key={party.name} />
                        </>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default PartyCandidates;
