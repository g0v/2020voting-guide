import List from '@material-ui/core/List';
import React, { useEffect, useState } from 'react';
import Navigation from '../Navigation';
import { CandidateCard, CandidateProps } from './CandidateCard';

interface Route {
    match: {
        params: {
            county: string;
            constituency: string;
        };
    };
}

const CountyCandidates = ({ match }: Route) => {
    const { constituency } = match.params;
    const [candidates, setCandidates] = useState<CandidateProps[]>([]);
    useEffect(() => {
        fetch(`/api/constituency/${constituency}`)
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
                        photo={candidate.photo}
                        party={candidate.party}
                        experience={candidate.experience}
                    />
                ))}
            </List>
        </>
    );
};

export default CountyCandidates;
