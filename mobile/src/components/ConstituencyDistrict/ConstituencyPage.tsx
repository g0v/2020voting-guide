import React from 'react';
import constituencyArea from './constituenciesArea';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardActionArea from '@material-ui/core/CardActionArea';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from '../Navigation';
import Divider from '@material-ui/core/Divider';

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
                            {Object.keys(constituencyArea[name]).join('、')}
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
