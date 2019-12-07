import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Box } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import api from '../../data/api/party_api.json';
import partyCandidates from '../../data/party_candidates.json';
import BasicInfoTab from './BasicInfoTab';
import { Bill } from '../IssueBill';
import IssueBillTab from '../IssueBillTab';
import Progressing from '../Progressing';
import CandidateList from './CandidateList';
import { Candidate } from './types';
import Nav from './Nav';

const Party = ({ match }: RouteComponentProps<{ party: string }>) => {
    const [tab, setTab] = React.useState(0);
    const [bills, setBills] = React.useState<Bill[]>([]);
    const { party } = match.params;
    const candidates: Candidate[] = (partyCandidates as {
        [party: string]: Candidate[];
    })[party];

    useEffect(() => {
        fetch(`/api/party/${match.params.party}`)
            .then(res => res.json())
            .then(party => setBills(party.bills));
    }, []);

    return (
        <Box color="background">
            {/* TODO: use backend API*/}
            <Nav {...api} />
            <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                onChange={(_e, num) => setTab(num)}
            >
                <Tab label="不分區名單" />
                <Tab label="議題法案" />
                <Tab label="過去表現" />
                <Tab label="經歷政見" />
            </Tabs>
            {tab === 0 && <CandidateList candidates={candidates} />}
            {tab === 1 && <IssueBillTab bills={bills} />}
            {tab === 2 && <Progressing />}
            {tab === 3 && <BasicInfoTab />}
        </Box>
    );
};

export default Party;
