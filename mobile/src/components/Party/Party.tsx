import { Box } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import api from '../../data/api/party_api.json';
import BasicInfoTab from './BasicInfoTab';
import IssueBillTab from './IssueBillTab';
import Nav from './Nav';
import PassPerformance from './PassPerformanceTab';

interface Party {
    match: {
        params: {
            name: string;
        };
    };
    location: {
        search: string;
    };
}

const Party = ({ match, location }: Party) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <Box color="background">
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
                <IssueBillTab />
            ) : value === 1 ? (
                <PassPerformance />
            ) : (
                <BasicInfoTab />
            )}
        </Box>
    );
};

export default Party;
