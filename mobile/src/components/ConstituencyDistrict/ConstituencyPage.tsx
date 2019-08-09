import React from 'react';
import constituencyArea from './constituenciesArea';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Link from '@material-ui/core/Link';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    card: {
        backgroundColor: '#D3F6F2'
    }
});
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
    const classes = useStyle();
    return (
        <>
            <Link href={`/regional/${county}/${name}`}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <Box m={1}>
                            <Typography variant="h6">{name}</Typography>
                            <Typography variant="button">
                                {Object.keys(constituencyArea[name]).join('、')}
                            </Typography>
                        </Box>
                    </CardActionArea>
                </Card>
            </Link>
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
            <Box m={2}>
                <Typography variant="h6">{county}</Typography>
            </Box>
            {constituencyNames.map(name => (
                <Box m={1} key={name}>
                    <ConstituencyCard name={name} county={county} key={name} />
                </Box>
            ))}
        </>
    );
};

export default ConstituencyPage;
