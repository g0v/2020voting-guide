import React from 'react';
import constituencyArea from './constituenciesArea';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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

const ConstituencyPage: React.FunctionComponent<County> = ({ match }) => {
    const { county } = match.params;
    console.log(match);
    const constituencyNames = Object.keys(constituencyArea).filter(
        constituency => constituency.startsWith(county)
    );
    return (
        <>
            <Box m={2}>
                <Typography variant="h6">{county}</Typography>
            </Box>
            {constituencyNames.map(name => (
                <Box m={1}>
                    <ConstituencyCard name={name} county={county} key={name} />
                </Box>
            ))}
        </>
    );
};

const ConstituencyCard: React.FunctionComponent<Constituency> = ({
    name,
    county
}) => {
    return (
        <>
            <Button href={`/regional/${county}/${name}`} size="large" fullWidth>
                <Typography variant="button">
                    {Object.keys(constituencyArea[name]).join('、')}
                </Typography>
            </Button>
            <Divider />
        </>
    );
};

export default ConstituencyPage;
