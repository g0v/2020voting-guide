import {
    Box,
    Breadcrumbs,
    Container,
    Link,
    List,
    ListItem,
    Typography
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
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

const SUBTITLE_MAP: { [key: string]: string } = {
    '': '1',
    平地: '1',
    山地: '2',
    一: '1',
    二: '2',
    三: '3',
    四: '4',
    五: '5',
    六: '6',
    七: '7',
    八: '8',
    九: '9',
    十: '10',
    十一: '11',
    十二: '12'
};

const ConstituencyCard = ({ name, county }: Constituency) => {
    const subtitle: string = name
        .replace(county, '')
        .replace('第', '')
        .replace('選舉區', '');

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
                divider
            >
                <Box py={3} px={3} display="flex">
                    <Typography
                        variant="h3"
                        className="constituency-card-item__area"
                    >
                        選區
                        <span>{SUBTITLE_MAP[subtitle]}</span>
                    </Typography>
                    <Typography variant="h3">{areaName}</Typography>
                </Box>
            </ListItem>
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
    return (
        <Container className="p-0">
            <Navigation title="區域立委候選人">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link href="/regional">
                        <Typography variant="h4">
                            <u>所有縣市</u>
                        </Typography>
                    </Link>
                    <Typography variant="h4" color="textSecondary">
                        {county}
                    </Typography>
                </Breadcrumbs>
            </Navigation>
            <List>
                {constituencyNames.map((name: string) => (
                    <ConstituencyCard name={name} county={county} key={name} />
                ))}
            </List>
        </Container>
    );
};

export default ConstituencyPage;
