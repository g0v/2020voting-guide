import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import countyConstituency from './county_constituency.json';
import Navigation from '../Navigation';

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
