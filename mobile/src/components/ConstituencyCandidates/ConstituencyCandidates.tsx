import {
    Breadcrumbs,
    Container,
    Link,
    List,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import cecCandidates from '../../data/cec_regional_all.json';
import useFetch from '../../hooks/useFetch';
import Navigation from '../Navigation';
import CandidateCard, { CandidateProps } from './CandidateCard';
import CandidateCardWrap from './CandidateCardWrap';
import CompareBTN from './CompareBTN';
import './ConstituencyCandidates.scss';

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
    location: any;
}

const CountyCandidates = ({ match, location }: Route) => {
    const { county, constituency } = match.params;

    // fetch api
    const { isLoading, responseData } = useFetch<CandidateProps[]>(
        `/api/constituency/${constituency}`,
        [],
        [constituency]
    );
    const [selectMode, setSelectMode] = useState<boolean>(false);
    // select candidateNames only
    const [selectCandidateNames, setSelectCandidateNames] = useState<string[]>(
        []
    );
    // toggle select mode
    const toggleSelectMode = useCallback(
        () => setSelectMode((prev: boolean) => !prev),
        []
    );

    React.useLayoutEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('select')) {
            const names: string[] = (urlParams.get('select') as string).split(
                ','
            );
            setSelectMode(true);
            setSelectCandidateNames(names);
        }
    }, []);

    const onCandidateCardWrapClick = useCallback(
        (
            { name }: CandidateProps,
            event: React.MouseEvent<HTMLDivElement, MouseEvent>
        ) => {
            if (!selectMode) {
                return;
            }
            event.preventDefault();
            setSelectCandidateNames((prev: string[]) => {
                const indexOf: number = prev.indexOf(name);
                if (indexOf === -1) {
                    return [...prev, name];
                } else {
                    prev.splice(indexOf, 1);
                    return [...prev];
                }
            });
        },
        [selectMode]
    );

    const onLocationHrefClick = useCallback(() => {
        window.location.href = `/regional/${county}/${constituency}/compare/${selectCandidateNames.toString()}`;
    }, [selectCandidateNames]);

    const rootClazz: string = clsx('constituency-candidates loading p-0', {
        'is-show': isLoading,
        'is-select': selectMode
    });

    const classes = useStyles();
    return (
        <Container className={rootClazz}>
            <div
                onClick={onLocationHrefClick}
                className={clsx(
                    'constituency-candidates__submit-btn cursor-pointer',
                    {
                        'is-show': selectMode,
                        'is-disabled': selectCandidateNames.length < 2
                    }
                )}
            >
                <span>開始比較</span>
            </div>
            <div className="constituency-candidates__header">
                <Navigation title="區域立委候選人">
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                    >
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
                <CompareBTN
                    selectMode={selectMode}
                    onClick={toggleSelectMode}
                    label="比較候選人"
                />
                <div
                    className={clsx('constituency-candidates__compare-text', {
                        'd-block': selectMode,
                        'd-none': !selectMode
                    })}
                >
                    選 2 位以上開始比較 已選 {selectCandidateNames.length} 位
                </div>
            </div>
            <List
                className={clsx(
                    !/Mobi|Android/i.test(navigator.userAgent) &&
                        classes.flexContainer
                )}
            >
                {responseData.map((candidate: CandidateProps) => {
                    const cecCandidate = cecCandidates.find(
                        cecCandidate =>
                            cecCandidate.constituency === constituency &&
                            cecCandidate.name === candidate.name
                    ) || { experience: '' };
                    return (
                        <CandidateCardWrap
                            onClick={event =>
                                onCandidateCardWrapClick(candidate, event)
                            }
                            selectIndex={selectCandidateNames.indexOf(
                                candidate.name
                            )}
                            selectMode={selectMode}
                            key={candidate.name}
                        >
                            <CandidateCard
                                id={candidate.id}
                                name={candidate.name}
                                photo={candidate.photo}
                                party={candidate.party}
                                constituency={constituency}
                                experience={cecCandidate.experience}
                                currentLegislator={candidate.currentLegislator}
                            />
                        </CandidateCardWrap>
                    );
                })}
            </List>
        </Container>
    );
};

export default CountyCandidates;
