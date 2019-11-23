import {
    Breadcrumbs,
    Link,
    List,
    Typography,
    Container
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';
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
    const { county, constituency } = match.params;
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
        <Container className={rootClazz}>
            <Navigation title="區域立委候選人">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link href="/regional">
                        <Typography variant="h4">
                            <u>所有縣市</u>
                        </Typography>
                    </Link>
                    <Link href={`/regional/${county}`}>
                        <Typography variant="h4">
                            <u>{county}</u>
                        </Typography>
                    </Link>
                    <Typography variant="h4" color="textSecondary">
                        {constituency}
                    </Typography>
                </Breadcrumbs>
            </Navigation>
            <List>
                {candidates.map((candidate: CandidateProps) => (
                    <CandidateCard
                        key={candidate.id}
                        id={candidate.id}
                        name={candidate.name}
                        photo={candidate.photo}
                        party={candidate.party}
                        constituency={constituency}
                        experience={candidate.experience}
                        currentLegislator={candidate.currentLegislator}
                    />
                ))}
            </List>
        </Container>
    );
};

export default CountyCandidates;
