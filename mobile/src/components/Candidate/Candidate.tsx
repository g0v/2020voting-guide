import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BasicInfo from './BasicInfo';

interface Candidate {
    match: {
        params: {
            name: string;
        };
    };
}

const Candidate: React.FunctionComponent<Candidate> = ({ match }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
            >
                <Tab label="基本資料" />
                <Tab label="過去表現" />
                <Tab label="立場" />
            </Tabs>
            {value === 0 ? <BasicInfo /> : value === 1 ? '過去表現' : '立場'}
        </>
    );
};

export default Candidate;
