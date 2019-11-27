import React from 'react';
import { Divider, Typography, Box, List } from '@material-ui/core';
import parties from '../../data/party.json';
import Navigation from '../Navigation';
import PartyCard from './PartyCard';

const PartyCandidates = () => {
    return (
        <>
            <Box>
                <Navigation title="不分區參選政黨" >
                    <Typography variant="subtitle1" color="textSecondary">
                        由得票超過5%的政黨依得票比例來分配34席
                    </Typography>
                </Navigation>
            </Box>
            <List>
                {parties
                    .map((party, i) => (
                        <>
                            <PartyCard {...party} />
                            {i !== parties.length - 1 && <Divider variant="middle" />}
                        </>
                    ))
                }
            </List>
        </>
    );
};

export default PartyCandidates;
