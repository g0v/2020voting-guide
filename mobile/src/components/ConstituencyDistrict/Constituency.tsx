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
            <Link to={`/${name}`}>
                <div className={classes.constituency}>
                    {Object.keys(constituencyArea[name]).join('、')}
                </div>
            </Link>
        </>
    );
};

export default ConstituencyPage;
