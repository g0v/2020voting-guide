import { Breadcrumbs, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import countyConstituency from '../../data/county_constituency.json';
import Navigation from '../Navigation';

const useStyles = makeStyles({
    listItem: {
        padding: '20px'
    }
});

const counties = countyConstituency.map(county => county.name);
const Constituency = () => {
    const classes = useStyles();
    return (
        <>
            <Navigation title="區域立委候選人">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Typography variant="h4" color="textSecondary">
                        所有縣市
                    </Typography>
                </Breadcrumbs>
            </Navigation>
            <List>
                {counties.map(county => (
                    <ListItem
                        key={county}
                        button
                        component="a"
                        href={`/regional/${county}`}
                        divider={true}
                        className={classes.listItem}
                    >
                        <ListItemText primary={county}></ListItemText>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default Constituency;
