import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import countyConstituency from '../../data/county_constituency.json';
import Navigation from '../Navigation';

const useStyles = makeStyles({
    listItem: {
        padding: "20px",
    }
});

const counties = countyConstituency.map(county => county.name);
const Constituency = () => {
    const classes = useStyles()
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
                            divider={true}
                            className={classes.listItem}
                        >
                            <ListItemText primary={county}></ListItemText>
                        </ListItem>
                    </>
                ))}
            </List>
        </>
    );
};

export default Constituency;
