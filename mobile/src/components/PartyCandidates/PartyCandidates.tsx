import { List } from '@material-ui/core';
import React from 'react';
import parties from '../../data/party.json';
import Navigation from '../Navigation';
import PartyCard from './PartyCard';

const PartyCandidates = () => {
    return (
        <>
            <Navigation title="不分區參選政黨" >由得票超過5%的政黨依得票比例來分配34席</Navigation>
            <List>
                {parties.map(party => (
                    <PartyCard {...party} />
                ))}
            </List>
        </>
    );
};

export default PartyCandidates;
