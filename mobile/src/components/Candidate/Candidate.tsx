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
                <Tab label="議題法案" />
                <Tab label="過去表現" />
                <Tab label="經歷政見" />
            </Tabs>
            {value === 0 ? (
                <Position />
            ) : value === 1 ? (
                <PassPerformance />
            ) : (
                <BasicInfoTab />
            )}
        </>
    );
};

export default Candidate;
