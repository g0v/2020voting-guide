import {
    Breadcrumbs,
    List,
    ListItem,
    ListItemText,
    Typography,
    Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import countyConstituency from '../../data/county_constituency.json';
import Navigation from '../Navigation';

const desktopStyle = makeStyles({
    listItemWrapper: {
        'text-align': 'center',
    },
    listItem: {
        boxSizing: 'border-box',
        marginTop: '24px',
        marginRight: '8px',
        marginLeft: '8px',
        paddingTop: '45px',
        paddingLeft: '28px',
        width: '316px',
        height: '170px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.03)',
        borderRadius: '4px',
        display: 'inline-block',
    },
    cityName: {
        boxSizing: 'border-box',
        display: 'block',
        'line-height': '36px',
        /* Font */
        color: '#222',
        'font-family': 'Noto Sans TC',
        'font-style': 'normal',
        'font-weight': '500',
        'font-size': '24px',
        'letter-spacing': '0.0357143em',        
    },
    cityInfo: {
        boxSizing: 'border-box',
        'line-height': '27px',
        marginTop: '5px',
        /* Font */
        'font-family': 'Noto Sans TC',
        'font-style': 'normal',
        'font-weight': 'normal',
        'font-size': '18px',
        color: '#EC502B',
    }, 
});
const mobileStyle = makeStyles({
    listItemWrapper: {
    },
    listItem: {
        padding: '20px',
    },
    cityName: {     
    },
    cityInfo: {
    },     
});

const counties = countyConstituency.map(county => county.name);
const Constituency = () => {
    const isDesktop = useMediaQuery('(min-width:769px)');
    const useStyles = isDesktop ? desktopStyle : mobileStyle;
    const classes = useStyles();
    return (
        <Container className="p-0">
            <Navigation title="區域立委候選人">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Typography variant="h4" color="textSecondary">
                        所有縣市
                    </Typography>
                </Breadcrumbs>
            </Navigation>
            <List className={classes.listItemWrapper}>
                {counties.map(county => (
                    <ListItem
                        key={county}
                        button
                        component="a"
                        href={`/regional/${county}`}
                        divider={true}
                        className={classes.listItem}
                    >
                        <ListItemText className={classes.cityName} primary={county}></ListItemText>
                        {/* {isDesktop && <ListItemText className={classes.cityInfo} primary={'2300萬人'}></ListItemText>} */}
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Constituency;
