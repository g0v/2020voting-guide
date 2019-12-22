import { Link, Typography } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Alert from '../Alert';
import { Bill } from '../IssueBill';
import IssueBillTab from '../IssueBillTab';
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
    lastterm: string;
    lasttermyear: string;
    education: string;
    experience: string;
    politics: string;
    sittingRate: number;
    interpellationRate: number;
    interpellationnum: string;
    currentLegislator: boolean;
    maxinterpellationnum: string;
    interpellationcategory: string;
    billnum: string;
    billnumcategory: string;
    politicalcontribution: string;
    othercandidate: string;
}

const CandidateDefault = {
    name: '',
    photo: '',
    county: '',
    constituency: '',
    party: '',
    age: 0,
    education: '',
    experience: '',
    politic: '',
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
    bills: []
};

interface CandidatePage {
    match: {
        params: {
            constituency: string;
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
          padding: '20px 8% 0 8%',
          marginTop: '1px'
      }
    : {};

const CandidatePage = ({ match }: CandidatePage) => {
    const { name, constituency } = match.params;
    const urlParams = new URLSearchParams(window.location.search);
    let defaultTabIdex = 0;
    if (urlParams.has('tab')) {
        defaultTabIdex = parseInt(urlParams.get('tab') as string, 10);
    }
    const [tab, setTab] = useState(defaultTabIdex);
    const switchTab = (_: any, newValue: number) => {
        setTab(newValue);
    };

    const [candidate, setCandidate] = useState(CandidateDefault);
    useEffect(() => {
        fetch(`/api/candidate/${constituency}/${name}`)
            .then(res => res.json())
            .then(setCandidate);
    }, [name, constituency]);

    const [bills, setBills] = useState<Bill[]>([]);
    useEffect(() => {
        fetch(`/api/bills/${constituency}/${name}`)
            .then(res => res.json())
            .then(setBills);
    }, [name, constituency]);

    return (
        <>
            <Nav {...candidate} padding={desktopPadding} />
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
                <StrengthTab
                    name={name}
                    constituency={constituency}
                    padding={desktopPadding}
                />
            ) : tab === 2 ? (
                candidate.currentLegislator ? (
                    <PassPerformanceTab
                        {...candidate}
                        padding={desktopPadding}
                    />
                ) : (
                    <NoInfoTab name={candidate.name} from="passPerformance" />
                )
            ) : (
                // ) : candidate.education ||
                //   candidate.experience ||
                //   candidate.politic ? (
                //     <BasicInfoTab {...candidate} />
                <NoInfoTab name={candidate.name} from="basicInfo" />
            )}
        </>
    );
};

export default CandidatePage;
