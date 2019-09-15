import { List, ListItem, ListItemText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import React from 'react';
import Navigation from '../Navigation';
import countyConstituency from './county_constituency.json';
const counties = countyConstituency.map(county => county.name);
const Constituency = () => {
    return (
        <>
            <Navigation title="區域立委候選人" description="選擇縣市" />
            <List>
                {counties.map(county => (
                    <>
                        <ListItem
                            button
                            component="a"
                            href={`/regional/${county}`}
                        >
                            <ListItemText primary={county}></ListItemText>
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>
        </>
    );
};

export default Constituency;
