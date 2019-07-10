import React from 'react';
import constituencyArea from './constituenciesArea';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import NavigateBefore from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        constituencyArea: {
            lineHeight: '24px',
            '&:hover': {
                color: '#aaa'
            },
            backgroundColor: '#cacbcc',
            padding: theme.spacing(2),
            margin: theme.spacing(1),
            cursor: 'pointer'
        }
    })
);

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
    console.log(classes)
    return (
        <>
            <div ><NavigateBefore></NavigateBefore>選區找立委</div>
            <Grid container>
                {
                    Object.keys(constituencyArea[name]).map(area => {
                        return (
                            <Grid item xs={6}>
                                <Link to={`/regional/${name.slice(0, 3)}/${area}`} key={area}>
                                    <div className={classes.constituencyArea}>{area}</div>
                                </Link>
                            </Grid>
                        )
                    })}
            </Grid>
        </>
    );
};

export default ConstituencyPage;
