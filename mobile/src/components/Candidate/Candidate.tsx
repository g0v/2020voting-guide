import { Box, Link, Typography } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import React, { FunctionComponent, useEffect, useState } from 'react';
import cecCandidates from '../../data/cec_regional_all.json';
import county_constituency from '../../data/county_constituency.json';
import partyCandidate from '../../data/party_candidates_integrated.json';
import useTimeout from '../../hooks/useTimeout';
import { gaEvent } from '../../utils';
import Alert from '../Alert';
import { Bill } from '../IssueBill';
import IssueBillTab from '../IssueBillTab';
import BasicInfoTab from './BasicInfoTab';
import Nav from './Nav';
import NoInfoTab from './NoInfoTab';
import PassPerformanceTab from './PassPerformanceTab';
import StrengthTab from './StrengthTab';

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
const tabsGAValue: {
    [index: string]: string;
} = {
    議題法案: 'viewTabLLaw',
    競選戰力: 'viewTabLFanpage',
    立院表現: 'viewTabL4y',
    經歷政見: 'viewTabLExp'
};

const isDesktop = !/Mobi|Android/i.test(navigator.userAgent);

const desktopPadding = isDesktop
    ? {
          padding: '0 8%'
      }
    : {};

const CandidatePage = ({ match }: CandidatePage) => {
    const { party, name, constituency } = match.params;
    const urlParams = new URLSearchParams(window.location.search);
    let defaultTabIdex = '議題法案';
    if (urlParams.has('tab')) {
        defaultTabIdex = urlParams.get('tab') as string;
    }
    const [tab, setTab] = useState(defaultTabIdex);
    const switchTab = (_: any, newValue: string) => {
        setTab(newValue);
    };

    const [candidate, setCandidate] = useState<CandidateType>(CandidateDefault);
    const [bills, setBills] = useState<Bill[]>([]);
    const cecCandidate = cecCandidates.find(
        candidate =>
            candidate.name === name && candidate.constituency == constituency
    );
    const isRegional = constituency !== undefined;

    const billsURL = isRegional
        ? `/api/bills/${constituency}/${name}`
        : `/api/nonregional/bills/${party}/${name}`;

    useTimeout(
        () => {
            gaEvent('legislator', 'browser', tabsGAValue[tab]);
        },
        5000,
        [tab]
    );

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
    }, []);

    useEffect(() => {
        if (
            candidate.name &&
            !candidate.currentLegislator &&
            !caucusParty.includes(candidate.party)
        ) {
            setTab('競選戰力');
        }
    }, [candidate]);

    useEffect(() => {
        fetch(billsURL)
            .then(res => res.json())
            .then(setBills);
    }, []);

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
                    onChange={switchTab}
                >
                    {candidate.name &&
                    !candidate.currentLegislator &&
                    !caucusParty.includes(candidate.party) ? null : (
                        <Tab label="議題法案" value="議題法案" />
                    )}
                    <Tab label="競選戰力" value="競選戰力" />
                    {name === '蔡其昌' ||
                    (candidate.name && !candidate.currentLegislator) ? null : (
                        <Tab label="立院表現" value="立院表現" />
                    )}
                    <Tab label="經歷政見" value="經歷政見" />
                </Tabs>
            </Box>
            {tab === '議題法案' ? (
                candidate.currentLegislator ||
                caucusParty.includes(candidate.party) ? (
                    <>
                        <IssueBillTab
                            bills={bills}
                            padding={desktopPadding}
                            isDesktop={isDesktop}
                        >
                            {name === '蔡其昌' ? (
                                <Box
                                    bgcolor="##E5E5E5"
                                    height={237}
                                    textAlign="center"
                                    py={3}
                                    px={1}
                                >
                                    <img
                                        width="150"
                                        height="150"
                                        src="/img/doll/chairman.svg"
                                        alt="副院長"
                                    />
                                    <Box py={1}>
                                        <Typography
                                            variant="h4"
                                            color="textPrimary"
                                        >
                                            蔡其昌是上屆立法院副院長
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        color="textSecondary"
                                    >
                                        立法院長、副院長的工作是依法監督管理立法院委員會，組織立法院決策程序與行政議事，並負責召集院會
                                    </Typography>
                                </Box>
                            ) : (
                                <IssueBillTabAlert
                                    name={candidate.name}
                                    isCurrentLegislator={
                                        candidate.currentLegislator
                                    }
                                />
                            )}
                        </IssueBillTab>
                    </>
                ) : (
                    <NoInfoTab name={candidate.name} from="issueBill" />
                )
            ) : tab === '競選戰力' ? (
                <StrengthTab {...candidate} padding={desktopPadding} />
            ) : tab === '立院表現' ? (
                candidate.currentLegislator ? (
                    <PassPerformanceTab
                        {...candidate}
                        padding={desktopPadding}
                    />
                ) : (
                    <NoInfoTab name={candidate.name} from="passPerformance" />
                )
            ) : (
                <BasicInfoTab
                    {...candidate}
                    isRegional={isRegional}
                    padding={desktopPadding}
                    cecCandidate={cecCandidate}
                />
            )}
        </Box>
    );
};

export default CandidatePage;
