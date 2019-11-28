import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import BasicInfoTab from './BasicInfoTab';
import IssueBillTab from './IssueBillTab';
import Nav from './Nav';
import NoInfoTab from './NoInfoTab';
import PassPerformanceTab from './PassPerformanceTab';

const CandidateDefault = {
    name: '',
    photo: '',
    county: '',
    constituency: '',
    party: '',
    age: 0,
    lastterm: '',
    lasttermyear: '',
    educations: '',
    experiences: '',
    politics: '',
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

const caucusParty = ['民主進步黨', '中國國民黨', '親民黨', '時代力量'];

const CandidatePage = ({ match }: CandidatePage) => {
    const { name, constituency } = match.params;
    const [tab, setTab] = React.useState(0);
    const switchTab = (_: any, newValue: number) => {
        setTab(newValue);
    };

    const [candidate, setCandidate] = React.useState(CandidateDefault);
    React.useEffect(() => {
        fetch(`/api/candidate/${constituency}/${name}`)
            .then(res => res.json())
            .then(setCandidate);
    }, [name, constituency]);

    return (
        <>
            <Nav {...candidate} />
            <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                onChange={switchTab}
            >
                <Tab label="議題法案" />
                <Tab label="過去表現" />
                <Tab label="經歷政見" />
            </Tabs>

            {tab === 0 ? (
                candidate.currentLegislator ||
                caucusParty.includes(candidate.party) ? (
                    <IssueBillTab
                        name={candidate.name}
                        constituency={constituency}
                        currentLegislator={candidate.currentLegislator}
                    />
                ) : (
                    <NoInfoTab name={candidate.name} from="issueBill" />
                )
            ) : tab === 1 ? (
                candidate.currentLegislator ? (
                    <PassPerformanceTab {...candidate} />
                ) : (
                    <NoInfoTab name={candidate.name} from="passPerformance" />
                )
            ) : candidate.educations &&
              candidate.experiences &&
              candidate.politics ? (
                <BasicInfoTab name={name} constituency={constituency} />
            ) : (
                <NoInfoTab name={candidate.name} from="basicInfo" />
            )}
        </>
    );
};

export default CandidatePage;
