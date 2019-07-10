import React from 'react';
import constituencyArea from './constituenciesArea';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    constituency: {
        lineHeight: '24px',
        '&:hover': {
            color: '#aaa'
        }
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
}

const ConstituencyPage: React.FunctionComponent<County> = ({ match }) => {
    const county = match.params.county;
    console.log(match);
    const constituencyNames = Object.keys(constituencyArea).filter(
        constituency => constituency.startsWith(county)
    );
    return (
        <>
            {constituencyNames.map(name => (
                <ConstituencyCard name={name} key={name} />
            ))}
        </>
    );
};

const ConstituencyCard: React.FunctionComponent<Constituency> = ({ name }) => {
    const classes = useStyles();
    return (
        <>
            <div>選區找立委</div>
            {
                Object.keys(constituencyArea[name]).map(area => {
                    return <Link to={`/regional/${name.slice(0, 3)}/${area}`} key={area}>
                        <div >{area}</div>
                    </Link>
                })}
        </>
    );
};

export default ConstituencyPage;
