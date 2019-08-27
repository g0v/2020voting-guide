import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { CandidateCard, CandidateProps } from './CandidateCard';

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
        fetch(`/api/candidates/constituency/${constituency}`)
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
                    <Box my={1}>
                        <CandidateCard
                            id={candidate.id}
                            name={candidate.name}
                            picUrl={candidate.picUrl}
                            party={candidate.party}
                            experience={candidate.experience}
                            county={county}
                            constituency={constituency}
                        />
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default CountyCandidates;
