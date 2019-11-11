import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import { Bill } from '../IssueBill';
import BasicInfoTab from './BasicInfoTab';
import IssueBillTab from './IssueBillTab';
import Nav from './Nav';
import PassPerformanceTab from './PassPerformanceTab';

interface Candidate {
    name: string;
    photo: string;
    county: string;
    constituency: string;
    party: string;
    age: number;
    lastterm: string;
    lasttermyear: string;
    educations: string;
    experiences: string;
    politics: string;
    sittingRate: number;
    interpellationRate: number;
    interpellationnum: string;
    maxinterpellationnum: string;
    interpellationcategory: { name: string; value: number }[];
    billnum: string;
    billnumcategory: { name: string; percent: number }[];
    politicalcontribution: string;
    othercandidate: string;
    bills: Bill[];
}
interface CandidatePage {
    match: {
        params: {
            name: string;
        };
    };
}

const CandidatePage = ({ match }: CandidatePage) => {
    const { name } = match.params;
    const [tab, setTab] = React.useState(0);
    const switchTab = (_: any, newValue: number) => {
        setTab(newValue);
    };

    const [candidate, setCandidate] = React.useState<Candidate>();
    React.useEffect(() => {
        fetch(`/api/candidate/${name}`)
            .then(res => res.json())
            .then(setCandidate);
    }, [name]);

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
                <IssueBillTab {...candidate} />
            ) : tab === 1 ? (
                <PassPerformanceTab {...candidate} />
            ) : (
                <BasicInfoTab name={name} />
            )}
        </>
    );
};

export default CandidatePage;
