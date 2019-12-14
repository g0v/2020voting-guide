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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    flexContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: '88%',
        margin: '0 auto'
    }
});

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
    const rootClazz: string = clsx('loading p-0', { 'is-show': isLoading });
    const classes = useStyles();
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
            <List className={clsx(!(/Mobi|Android/i.test(navigator.userAgent)) && classes.flexContainer)}>
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
