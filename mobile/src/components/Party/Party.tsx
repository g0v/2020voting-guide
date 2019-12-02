import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Box } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import api from '../../data/api/party_api.json';
import BasicInfoTab from './BasicInfoTab';
import { Bill } from '../IssueBill';
import IssueBillTab from '../IssueBillTab';
import Nav from './Nav';
import PassPerformance from './PassPerformanceTab';

const Party = ({ match }: RouteComponentProps<{ party: string }>) => {
    const [tab, setTab] = React.useState(0);
    const [bills, setBills] = React.useState<Bill[]>([]);

    useEffect(() => {
        fetch(`/api/party/${match.params.party}`)
            .then(res => res.json())
            .then(party => setBills(party.bills));
    }, []);

    return (
        <Box color="background">
            <Nav {...api} />
            <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                onChange={(_e, num) => setTab(num)}
            >
                <Tab label="議題法案" />
                <Tab label="過去表現" />
                <Tab label="經歷政見" />
            </Tabs>
            {tab === 0 ? (
                <IssueBillTab bills={bills} />
            ) : tab === 1 ? (
                <PassPerformance />
            ) : (
                <BasicInfoTab />
            )}
        </Box>
    );
};

export default Party;
