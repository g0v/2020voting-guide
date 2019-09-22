import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import api from './api.json';
import BasicInfoTab from './BasicInfoTab';
import IssueBillTab from './IssueBillTab';
import Nav from './Nav';
import PassPerformance from './PassPerformanceTab';

const Candidate = () => {
    const [value, setValue] = React.useState(2);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Nav {...api} />
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
                <IssueBillTab {...api} />
            ) : value === 1 ? (
                <PassPerformance />
            ) : (
                <BasicInfoTab />
            )}
        </>
    );
};

export default Candidate;
