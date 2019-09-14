import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BasicInfoTab from './BasicInfoTab';
import PassPerformance from './PassPerformanceTab';
import Position from './PositionTab';
import queryString from 'query-string';
import Nav from './Nav';

interface Candidate {
    match: {
        params: {
            name: string;
        };
    };
    location: {
        search: string;
    };
}

const Candidate: React.FunctionComponent<Candidate> = ({ match, location }) => {
    const [value, setValue] = React.useState(0);
    const { county, constituency } = queryString.parse(location.search) as {
        county: string;
        constituency: string;
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <>
            <Nav name="潘建志" county={county} constituency={constituency} />
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                onChange={handleChange}
            >
                <Tab label="基本資料" />
                <Tab label="過去表現" />
                <Tab label="立場" />
            </Tabs>
            {value === 0 ? (
                <BasicInfoTab />
            ) : value === 1 ? (
                <PassPerformance />
            ) : (
                <Position />
            )}
        </>
    );
};

export default Candidate;
