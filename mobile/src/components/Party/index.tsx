import { Box, Link, Typography } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import React, { useEffect } from 'react';
import clamp from 'lodash/clamp';
import { RouteComponentProps } from 'react-router';
import partyInfos from '../../data/party.json';
import partyCandidates from '../../data/party_candidates_integrated.json';
import partyPolitics2016 from '../../data/party_politics_2016.json';
import partyPolitics2020 from '../../data/party_politics_2020.json';
import partyPolitics2020Cec from '../../data/party_politics_2020_cec.json';
import partyPositions from '../../data/party_positions.json';
import { Bill } from '../IssueBill';
import IssueBillTab from '../IssueBillTab';
// import Progressing from '../Progressing';
import Seats from '../Party/Seats';
import BasicInfoTab from './BasicInfoTab';
import CandidateList from './CandidateList';
import Nav from './Nav';
import NewParty from './NewParty';
import { Candidate, Position } from './types';

const currentParty = ['民主進步黨', '中國國民黨', '時代力量', '親民黨'];

interface PartyInfo {
    name: string;
    logo: string;
    regionalLegislatorsNum: number;
    electedPersonNum: number;
    voteRate: string;
}

const TAB_NAMES: string[] = ['不分區名單', '議題法案', '基本資料'];

const Party = ({
    match
}: RouteComponentProps<{ party: string; tab?: string }>) => {
    const { party, tab: matchParamsTab = '' } = match.params;
    const tabInitValue = clamp(TAB_NAMES.indexOf(matchParamsTab), 0, 2);
    const [tab, setTab] = React.useState(tabInitValue);
    const [bills, setBills] = React.useState<Bill[]>([]);

    const candidates: Candidate[] =
        (partyCandidates as {
            [party: string]: Candidate[];
        })[party] || [];

    useEffect(() => {
        fetch(`/api/party/${match.params.party}`)
            .then(res => res.json())
            .then(party => setBills(party.bills));
    }, [match.params.party]);

    const updateLocationHref = React.useCallback((idx: number) => {
        window.history.replaceState(
            {},
            '',
            `/party/${party}/${TAB_NAMES[idx]}`
        );
    }, []);

    const partyInfo: PartyInfo | undefined = partyInfos.find(
        p => p.name === party
    );

    if (partyInfo === undefined) return null;

    const positions = (partyPositions as Position[]).filter(
        p => p.party === party
    );

    const lastPartyPolitics = partyPolitics2016.find(p => p.name === party);
    const lastPolitics = lastPartyPolitics ? lastPartyPolitics.politics : '';

    const currentPartyPolitics = partyPolitics2020.find(p => p.name === party);
    const currentPolitics = currentPartyPolitics
        ? currentPartyPolitics.politics
        : '';

    const currentPartyPoliticsCec = partyPolitics2020Cec.find(
        p => p.name === party
    );
    const currentPoliticsCec = currentPartyPoliticsCec
        ? currentPartyPoliticsCec.politics
        : '';

    return (
        <Box pt="60px">
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
                {partyInfo.electedPersonNum > 0 && (
                    <Seats num={partyInfo.electedPersonNum} />
                )}
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
                    onChange={(_e, num) => {
                        setTab(num);
                        updateLocationHref(num);
                    }}
                >
                    <Tab label="不分區名單" />
                    <Tab label="議題法案" />
                    {/* <Tab label="過去表現" /> */}
                    <Tab label="基本資料" />
                </Tabs>
            </Box>
            {tab === 0 && (
                <CandidateList
                    electedPersonNum={partyInfo.electedPersonNum}
                    party={party}
                    candidates={candidates}
                />
            )}
            {tab === 1 ? (
                currentParty.indexOf(party) === -1 ? (
                    <NewParty name={party} />
                ) : (
                    <IssueBillTab party={party} isParty bills={bills} />
                )
            ) : null}
            {/* {tab === 2 && <Progressing />} */}
            {tab === 2 && (
                <BasicInfoTab
                    party={party}
                    lastPolitics={lastPolitics}
                    currentPolitics={currentPolitics}
                    currentPoliticsCec={currentPoliticsCec}
                    positions={positions}
                />
            )}
        </Box>
    );
};

export default Party;
