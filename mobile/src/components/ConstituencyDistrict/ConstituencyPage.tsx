import React from 'react';
import constituencyArea from './constituenciesArea';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';

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
            <Box display="flex" flexWrap="wrap" justifyContent="center">
                {constituencyNames.map(name => (
                    <Box m={1}>
                        <ConstituencyCard
                            name={name}
                            county={county}
                            key={name}
                        />
                    </Box>
                ))}
            </Box>
        </>
    );
};

const ConstituencyCard: React.FunctionComponent<Constituency> = ({
    name,
    county
}) => {
    return (
        <>
            <Link to={`/regional/${county}/${name}`}>
                <Box width={150} height={150} textAlign="center" boxShadow="1">
                    {Object.keys(constituencyArea[name]).join('、')}
                </Box>
            </Link>
        </>
    );
};

export default ConstituencyPage;
