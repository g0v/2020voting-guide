import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Typography, Box, Link } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Tabs from '@material-ui/core/Tabs';
// import api from '../../data/api/party_api.json';
import partyInfos from '../../data/party.json';
import partyCandidates from '../../data/party_candidates.json';
import BasicInfoTab from './BasicInfoTab';
import { Bill } from '../IssueBill';
import IssueBillTab from '../IssueBillTab';
import Progressing from '../Progressing';
import Seats from '../Party/Seats';
import CandidateList from './CandidateList';
import { Candidate } from './types';
import Nav from './Nav';

interface PartyInfo {
    name: string;
    logo: string;
    regionalLegislatorsNum: number;
    electedPersonNum: number;
    voteRate: string;
}

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

    const partyInfo: PartyInfo | undefined = partyInfos.find(
        p => p.name === party
    );

    if (partyInfo === undefined) return null;

    return (
        <Box color="background" pt="60px">
            {/* TODO: use backend API*/}
            <Box
                bgcolor="white"
                position="fixed"
                width="100%"
                top="45px"
                display="flex"
                alignItems="center"
                zIndex="500"
                pt={3}
            >
                <Link href={`/parties`}>
                    <KeyboardArrowLeft fontSize="large" />
                </Link>
                <Box>
                    <Typography variant="h3" display="inline">
                        {`${partyInfo.name} `}
                    </Typography>
                </Box>
                <Seats num={partyInfo.electedPersonNum} />
            </Box>
            <Nav
                logo={partyInfo.logo}
                name={partyInfo.name}
                regionalSittingNum={partyInfo.regionalLegislatorsNum}
                nonRegionalSittingNum={partyInfo.electedPersonNum}
                voteRate={partyInfo.voteRate}
            />
            <Box zIndex={499} position="sticky" bgcolor="white" top="100px">
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
            </Box>
            {tab === 0 && <CandidateList candidates={candidates} />}
            {tab === 1 && <IssueBillTab bills={bills} />}
            {tab === 2 && <Progressing />}
            {tab === 3 && <BasicInfoTab />}
        </Box>
    );
};

export default Party;
