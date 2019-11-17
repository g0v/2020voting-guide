import List from '@material-ui/core/List';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
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
    const [isLoading, setLoading] = useState<boolean>(false);
    const [candidates, setCandidates] = useState<CandidateProps[]>([]);
    useEffect(() => {
        setLoading(true);
        fetch(`/api/constituency/${constituency}`)
            .then(res => res.json())
            .then(setCandidates)
            .finally(() => {
                setLoading(false);
            });
    }, [constituency]);
    const rootClazz: string = clsx('loading', { 'is-show': isLoading });
    return (
        <div className={rootClazz}>
            <Navigation title="區域立委候選人" description={constituency} />
            <List>
                {candidates.map((candidate: CandidateProps) => (
                    <CandidateCard
                        key={candidate.id}
                        id={candidate.id}
                        name={candidate.name}
                        photo={candidate.photo}
                        party={candidate.party}
                        experience={candidate.experience}
                        currentLegislator={candidate.currentLegislator}
                    />
                ))}
            </List>
        </div>
    );
};

export default CountyCandidates;
