import { Link, Typography, Box } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Alert from '../Alert';
import { Bill } from '../IssueBill';
import partyCandidate from '../../data/party_candidates.json';
import IssueBillTab from '../IssueBillTab';
import Nav from './Nav';
import NoInfoTab from './NoInfoTab';
import PassPerformanceTab from './PassPerformanceTab';
import StrengthTab from './StrengthTab';
import BasicInfoTab from './BasicInfoTab';

import county_constituency from '../../data/county_constituency.json';
export interface CandidateType {
    name: string;
    photo: string;
    county: string;
    constituency: string;
    party: string;
    age: number;
    education: string;
    educationConnection: string;
    experience: string;
    experienceConnection: string;
    politic: string;
    politicsConnection: string;
    sittingRate: number;
    interpellationRate: number;
    interpellationnum: string;
    currentLegislator: boolean;
    maxinterpellationnum: string;
    interpellationcategory: { name: string; percent: number }[];
    billnum: string;
    billnumcategory: { name: string; percent: number }[];
    politicalcontribution: string;
    othercandidate: string;
    fbPage: string;
}

const CandidateDefault: CandidateType = {
    name: '',
    photo: '',
    county: '',
    constituency: '',
    party: '',
    age: 0,
    education: '',
    experience: '',
    politic: '',
    educationConnection: '',
    experienceConnection: '',
    politicsConnection: '',
    sittingRate: 0,
    interpellationRate: 0,
    interpellationnum: '',
    currentLegislator: false,
    maxinterpellationnum: '',
    interpellationcategory: [],
    billnum: '',
    billnumcategory: [],
    politicalcontribution: '',
    othercandidate: '',
    fbPage: ''
};

interface CandidatePage {
    match: {
        params: {
            constituency: string;
            party: string;
            name: string;
        };
    };
}

const IssueBillTabAlert: FunctionComponent<{
    isCurrentLegislator: boolean;
    name: string;
}> = ({ name, isCurrentLegislator }) => (
    <Alert>
        <Typography variant="h5">
            {isCurrentLegislator
                ? `以下是 2016-2019 年${name}候選人在立法院實際提出的法案。`
                : `${name}候選人不是上屆立委，以下是他所屬政黨的黨團 2016-2019 年在立法院實際提出的法案`}
        </Typography>
        <Typography variant="h5">
            {`資料來源: `}
            <Link href="https://lis.ly.gov.tw/billtpc/billtp">
                立法動態資訊網法案追蹤平台
            </Link>
        </Typography>
    </Alert>
);

const caucusParty = ['民主進步黨', '中國國民黨', '親民黨', '時代力量'];

const isDesktop = !/Mobi|Android/i.test(navigator.userAgent);

const desktopPadding = isDesktop
    ? {
          padding: '0 8%'
      }
    : {};

const CandidatePage = ({ match }: CandidatePage) => {
    const { party, name, constituency } = match.params;
    const urlParams = new URLSearchParams(window.location.search);
    let defaultTabIdex = 0;
    if (urlParams.has('tab')) {
        defaultTabIdex = parseInt(urlParams.get('tab') as string, 10);
    }
    const [tab, setTab] = useState(defaultTabIdex);
    const switchTab = (_: any, newValue: number) => {
        setTab(newValue);
    };

    const [candidate, setCandidate] = useState<CandidateType>(CandidateDefault);
    const [bills, setBills] = useState<Bill[]>([]);
    const isRegional = constituency !== '不分區';

    const billsURL = isRegional
        ? `/api/bills/${constituency}/${name}`
        : `/api/nonregional/bills/${party}/${name}`;

    useEffect(() => {
        if (isRegional) {
            fetch(`/api/candidate/${constituency}/${name}`)
                .then(res => res.json())
                .then(setCandidate);
        } else {
            const candidateList: CandidateType[] = (partyCandidate as {
                [key: string]: CandidateType[];
            })[party];

            const candidate = candidateList.find(
                candidate => candidate.name === name
            );
            setCandidate(candidate || CandidateDefault);
        }
    }, [name, constituency, isRegional, party]);

    useEffect(() => {
        fetch(billsURL)
            .then(res => res.json())
            .then(setBills);
    }, [billsURL]);

    const county_list = county_constituency.filter(county =>
        county.area.includes(constituency || '')
    );
    const county = county_list.length ? county_list[0].name : '';
    const previousLink = isRegional
        ? `/regional/${county}/${constituency}`
        : `/party/${party}`;

    return (
        <Box pt={isDesktop ? '48px' : '60px'}>
            <Box
                bgcolor="white"
                position="fixed"
                width="100%"
                top={isDesktop ? '64px' : '45px'}
                display="flex"
                alignItems="center"
                zIndex="500"
                px={isDesktop ? '8%' : 0}
                pt={isDesktop ? 1 : 3}
            >
                <Link href={previousLink}>
                    <KeyboardArrowLeft fontSize="large" />
                </Link>
                <Box>
                    <Typography
                        variant="h3"
                        display="inline"
                        color="textPrimary"
                    >
                        {`${name} `}
                    </Typography>
                    <Typography
                        variant="h5"
                        display="inline"
                        color="textSecondary"
                    >
                        {constituency}
                    </Typography>
                </Box>
            </Box>
            <Nav {...candidate} padding={desktopPadding} />
            <Box
                zIndex={499}
                position="sticky"
                bgcolor="white"
                top={isDesktop ? '112px' : '100px'}
            >
                <Tabs
                    style={desktopPadding}
                    value={tab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    onChange={switchTab}
                >
                    <Tab label="議題法案" />
                    <Tab label="競選戰力" />
                    <Tab label="過去表現" />
                    <Tab label="經歷政見" />
                </Tabs>
            </Box>
            {tab === 0 ? (
                candidate.currentLegislator ||
                caucusParty.includes(candidate.party) ? (
                    <IssueBillTab
                        bills={bills}
                        padding={desktopPadding}
                        isDesktop={isDesktop}
                    >
                        <IssueBillTabAlert
                            name={candidate.name}
                            isCurrentLegislator={candidate.currentLegislator}
                        />
                    </IssueBillTab>
                ) : (
                    <NoInfoTab name={candidate.name} from="issueBill" />
                )
            ) : tab === 1 ? (
                <StrengthTab {...candidate} padding={desktopPadding} />
            ) : tab === 2 ? (
                candidate.currentLegislator ? (
                    <PassPerformanceTab
                        {...candidate}
                        padding={desktopPadding}
                    />
                ) : (
                    <NoInfoTab name={candidate.name} from="passPerformance" />
                )
            ) : candidate.education ||
              candidate.experience ||
              candidate.politic ? (
                <BasicInfoTab
                    {...candidate}
                    isRegional={isRegional}
                    padding={desktopPadding}
                />
            ) : (
                <NoInfoTab name={candidate.name} from="basicInfo" />
            )}
        </Box>
    );
};

export default CandidatePage;
