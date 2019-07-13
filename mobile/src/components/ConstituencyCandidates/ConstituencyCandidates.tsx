import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { CandidateProps, CandidateCard } from './CandidateCard';

const useStyles = makeStyles({
    county: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    subTitle: {
        marginTop: 12,
        marginBottom: 5,
        fontSize: 14
    },
    previous: {
        marginTop: 10,
        marginBottom: 25,
        fontSize: 24
    }
});

const CountyCandidates = () => {
    const classes = useStyles();
    const [candidates, setCandidates] = useState<CandidateProps[]>([]);
    useEffect(() => {
        fetch('/candidates/constituency/新竹')
            .then(res => res.json())
            .then(setCandidates);
    }, []);
    return (
        <>
            <div className={classes.previous}>＜其他選區</div>
            <div className={classes.county}>台北市 北投天母選區</div>
            <div className={classes.subTitle}>第一選區</div>
            {candidates.map(candidate => (
                <CandidateCard
                    id={candidate.id}
                    name={candidate.name}
                    photo={candidate.photo}
                    party={candidate.party}
                    experience={candidate.experience}
                />
            ))}
        </>
    );
};

export default CountyCandidates;
