import {
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core';
import React from 'react';
import constituencyArea from '../../data/constituencies_area.json';
import Navigation from '../Navigation';

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

const ConstituencyCard: React.FunctionComponent<Constituency> = ({
    name,
    county
}) => {
    return (
        <>
            <ListItem button component="a" href={`/regional/${county}/${name}`}>
                <ListItemText
                    primary={<Typography variant="h3">{name}</Typography>}
                    secondary={
                        <Typography variant="h5">
                            {Object.keys(
                                (constituencyArea as ConstituencyArea)[name]
                            ).join('、')}
                        </Typography>
                    }
                ></ListItemText>
            </ListItem>
            <Divider />
        </>
    );
};

const ConstituencyPage: React.FunctionComponent<County> = ({ match }) => {
    const { county } = match.params;
    const constituencyNames = Object.keys(constituencyArea).filter(
        constituency => constituency.startsWith(county)
    );
    return (
        <>
            <Navigation
                title="區域立委候選人"
                description={`${county} / 選擇選區`}
            />
            <List>
                {constituencyNames.map(name => (
                    <ConstituencyCard name={name} county={county} key={name} />
                ))}
            </List>
        </>
    );
};

export default ConstituencyPage;
