import { Breadcrumbs, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import countyConstituency from '../../data/county_constituency.json';
import Navigation from '../Navigation';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const desktopStyle = makeStyles({
    listItemWrapper: {
        'text-align': 'center',
    },    
    listItem: {
        boxSizing: 'border-box',
        position: 'relative',
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
    regionName: {
        boxSizing: 'border-box',
        display: 'block',
        'line-height': '36px',
        position: 'absolute',
        top: '29px',
        left: '28px',
        /* Font */
        color: '#222',
        'font-family': 'Noto Sans TC',
        'font-style': 'normal',
        'font-weight': '500',
        'font-size': '24px',
        'letter-spacing': '0.0357143em',        
    },
    regionInfo: {
        boxSizing: 'border-box',
        position: 'absolute',
        top: `${74-5}px`,//74-5
        left: `${29-12}px`,
    },
    regionInfoCellRow: {
        fontSize: 0,
    },
    regionInfoCell: {
        boxSizing: 'border-box',
        'width': '11px',
        'height': '5px',
        'border-radius': '2px',
        marginTop: '5px',
        marginLeft: '12px',
        display: 'inline-block',
    },
});
const mobileStyle = makeStyles({
    regionInfoCell: {
    },
    listItemWrapper: {
    },
    listItem: {
        padding: '20px',
    },
    regionName: {     
    },
});

const partyColorLookup: {[index: string]: any} = {
    'dpp': '#00AB4E',
    'tmd': '#0CB5B5',
    'no_party':'#212121',
    'gjin': '#A73F24',
    'party01': '#40C07A',
    'kmt': '#000099',
    'other_party': '#AEAEAE',
};

const regionInfoData = [
    // column #1
    ['party01', 'kmt', 'no_party', 'other_party', 'other_party', 'other_party', 'other_party'],
    // column #2
    ['dpp', 'kmt', 'other_party', 'other_party', 'other_party', 'other_party'],
    // column #3
    ['kmt', 'dpp', 'tmd', 'other_party'],
    // column #4
    ['kmt', 'dpp', 'other_party', 'other_party', 'other_party', 'other_party', 'other_party'],
    // column #5
    ['no_party', 'dpp', 'no_party', 'no_party', 'no_party', 'no_party', 'no_party'],
    // column #6
    ['kmt', 'dpp', 'no_party', 'no_party', 'no_party', 'no_party', 'no_party'],
    // column #7
    ['kmt', 'dpp', 'tmd', 'gjin', 'no_party', 'other_party', 'other_party'],
    // column #8
    ['kmt', 'dpp', 'tmd', 'gjin', 'no_party', 'other_party', 'other_party'],
];

const RegionInfoRow = (props?: any) => {
    const { classes, columnNum, rowIndex, rowData } = props;
    const cells = [];
    for (let i = 0; i < columnNum; i++) {
        const partyName: string = rowData[i];
        const partyColor = partyColorLookup[partyName];
        const cellStyle = {
            background: partyColor
        };

        cells.push(
            <div style={cellStyle} className={classes.regionInfoCell} key={`row-${rowIndex}-column-${i}`}></div>
        );
    }

    return (
        <>
            {cells}
        </>
    );
};

const RegionInfo = (props?: any) => {
    const { classes, infoData } = props;
    const columnNum = infoData.length;
    const rowNum =  Math.max.apply(Math,infoData.map((column: any) => column.length));

    const rows = [];
    for (let i = 0; i < rowNum; i++) {
        const rowData = infoData.map((column: any) => column[i]);

        const rowStyle = (i !== 0) ? {} : { marginBottom: '4px' };

        rows.push(
            <div style={rowStyle} className={classes.regionInfoCellRow}>
                <RegionInfoRow rowData={rowData} columnNum={columnNum} rowIndex={i} classes={classes} key={`${i}-row`}></RegionInfoRow>
            </div>
        );
    }

    
    return (
        <div className={classes.regionInfo}>
            {rows}
        </div>
    );
}

const counties = countyConstituency.map(county => county.name);
const Constituency = () => {
    const isDesktop = useMediaQuery('(min-width:769px)');
    const useStyles = isDesktop ? desktopStyle : mobileStyle;
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
                        <ListItemText className={classes.regionName} primary={county}></ListItemText>
                        {isDesktop && <RegionInfo classes={classes} infoData={regionInfoData} />}
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default Constituency;
