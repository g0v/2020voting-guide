import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import React, { useEffect, useState } from 'react';
import { CandidateCard, CandidateProps } from './CandidateCard';
import Navigation from '../Navigation';

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
            <Navigation title="區域立委候選人" description={constituency} />
            <List>
                {candidates.map(candidate => (
                    <CandidateCard
                        id={candidate.id}
                        name={candidate.name}
                        picUrl={candidate.picUrl}
                        party={candidate.party}
                        experience={candidate.experience}
                        county={county}
                        constituency={constituency}
                    />
                ))}
            </List>
        </>
    );
};

export default CountyCandidates;
