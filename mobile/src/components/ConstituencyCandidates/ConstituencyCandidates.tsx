import React, { useState, useEffect } from 'react';
import { CandidateProps, CandidateCard } from './CandidateCard';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

interface Route {
    match: {
        params: {
            county: string;
            constituency: string;
        };
    };
}

const CountyCandidates: React.FunctionComponent<Route> = ({ match }) => {
    const { county, constituency } = match.params;
    const [candidates, setCandidates] = useState<CandidateProps[]>([]);
    useEffect(() => {
        fetch(`/candidates/constituency/${constituency}`)
            .then(res => res.json())
            .then(setCandidates);
    }, [constituency]);
    return (
        <>
            <Button href={`/regional/${county}`} size="small">
                <Typography variant="button">＜ 其他選區</Typography>
            </Button>
            <Box mx={2}>
                <Box mb={1} mx={1}>
                    <Typography variant="h6">{county}</Typography>
                    <Typography variant="subtitle2">{constituency}</Typography>
                </Box>
                {candidates.map(candidate => (
                    <Link
                        to={`/candidate?county=${county}&constituency=${constituency}`}
                    >
                        <CandidateCard
                            id={candidate.id}
                            name={candidate.name}
                            photo={candidate.photo}
                            party={candidate.party}
                            experience={candidate.experience}
                        />
                    </Link>
                ))}
            </Box>
        </>
    );
};

export default CountyCandidates;
