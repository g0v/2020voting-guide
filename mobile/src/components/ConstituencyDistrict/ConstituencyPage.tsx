import { Divider, List, ListItem, Box, Typography } from '@material-ui/core';
import React from 'react';
import constituencyArea from '../../data/constituencies_area.json';
import Navigation from '../Navigation';
import './ConstituencyPage.scss';

interface County {
    match: {
        params: {
            county: string;
        };
    };
}

interface Constituency {
    name: string;
    county: string;
}
interface ConstituencyArea {
    [key: string]: { [key: string]: string | string[] };
}

const PATTERN = /第(一|二|三|四|五|六|七|八|九|十|十一|十二)選舉區/;
const TW_NUMBERS: string[] = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
    '十一',
    '十二'
];

const ConstituencyCard: React.FunctionComponent<Constituency> = ({
    name,
    county
}: Constituency) => {
    const shortName: string = name.replace(county, '');
    let num = '';

    if (PATTERN.test(shortName)) {
        num = shortName.replace(PATTERN, (match, p1) => {
            return TW_NUMBERS.indexOf(p1) + 1 + '';
        });
    }

    const areaName: string = Object.keys(
        (constituencyArea as ConstituencyArea)[name]
    )
        .join('、')
        .toString();
    return (
        <>
            <ListItem
                className="constituency-card-item"
                button
                component="a"
                href={`/regional/${county}/${name}`}
            >
                <Box py={3} px={3} display="flex">
                    <Typography
                        variant="h3"
                        className="constituency-card-item__area"
                    >
                        選區
                        <span>{num}</span>
                    </Typography>
                    <Typography variant="h3">{areaName}</Typography>
                </Box>
            </ListItem>
            <Divider />
        </>
    );
};

const ConstituencyPage: React.FunctionComponent<County> = ({
    match
}: County) => {
    const { county } = match.params;
    const constituencyNames: string[] = Object.keys(constituencyArea).filter(
        constituency => constituency.includes(county)
    );
    console.log(constituencyNames);
    return (
        <>
            <Navigation
                title="區域立委候選人"
                description={`${county} / 選擇選區`}
            />
            <List>
                {constituencyNames.map((name: string) => (
                    <ConstituencyCard name={name} county={county} key={name} />
                ))}
            </List>
        </>
    );
};

export default ConstituencyPage;
