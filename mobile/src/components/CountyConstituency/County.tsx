import React from 'react';
import countyConstituency from './county_constituency.json';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    title: {
        marginBottom: 40,
        fontSize: 24,
        fontWeight: 'bold'
    },
    county: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 18,
        lineHeight: '26px',
        borderBottom: '1px solid #C4C4C4'
    }
});

const counties = countyConstituency.map(county => county.name);
const Constituency = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.title}>選區找立委</div>
            {counties.map(county => (
                <Link to={`/regionals/${county}`} key={county}>
                    <div className={classes.county}>{county}</div>
                </Link>
            ))}
        </>
    );
};

export default Constituency;
