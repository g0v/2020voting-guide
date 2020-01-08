import { Box, Grid } from '@material-ui/core';
import React, { ReactNode } from 'react';
import DecoratedTitle from '../CommonComponents/DecoratedTitle';
import LoadingAndError from '../CommonComponents/LoadingAndError';
import PartyCard from '../PartyCandidates/PartyCard';
import { AllCandidatesAndParties } from './functions/getAllCandidatesAndParties';
import { SingleConstituencyCandidate } from './functions/getAllConstituencyCandidates';
import { SingleParty } from './functions/getAllParties';
import { SingleCandidateInParty } from './functions/getPartyCandidated';
import ResultItemCardWrapper from './SearchResultItems/ResultItemCardWrapper';
import SingleCandidateItemWithPartyName from './SearchResultItems/SingleCandidateItemWithPartyName';
import SingleConstituencyCadidateItem from './SearchResultItems/SingleConstituencyCadidateItem';
import EmptySearchResult from './EmptySearchResult';

type Props = {
    loading: boolean;
    error: any;
    data: AllCandidatesAndParties | undefined;
};

export const handleNullValueToString = (val: string | null) => (typeof val === 'string' ? val : '');

const SearchResultGridWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <Grid item xs={12} md={6}>
            {children}
        </Grid>
    );
};

export const ConstituecyCandidatesSearchResults = ({
    constituecyCandidates
}: {
    constituecyCandidates: SingleConstituencyCandidate[];
}) => {
    const isEmpty = constituecyCandidates.length === 0;
    if (isEmpty) {
        return <></>;
    }
    return (
        <SearchResultGridWrapper>
            <DecoratedTitle title={'區域立委'} />
            {constituecyCandidates.map((c, i) => (
                <SingleConstituencyCadidateItem key={i} {...c} />
            ))}
        </SearchResultGridWrapper>
    );
};

export const PartyCandidatesSearchResults = ({ partyCandidates }: { partyCandidates: SingleCandidateInParty[] }) => {
    const isEmpty = partyCandidates.length === 0;
    if (isEmpty) {
        return <></>;
    }
    return (
        <SearchResultGridWrapper>
            <DecoratedTitle title={'政黨不分區立委名單'} />
            {partyCandidates.map((c, i) => (
                <SingleCandidateItemWithPartyName key={i} candidate={{ ...c, age: String(c.age) }} />
            ))}
        </SearchResultGridWrapper>
    );
};

export const PartiesSearchResults = ({ parties }: { parties: SingleParty[] }) => {
    const isEmpty = parties.length === 0;
    if (isEmpty) {
        return <></>;
    }
    return (
        <SearchResultGridWrapper>
            <DecoratedTitle title={'黨團'} />
            {parties.map((party, i) => (
                <ResultItemCardWrapper key={i}>
                    <PartyCard {...party} />
                </ResultItemCardWrapper>
            ))}
        </SearchResultGridWrapper>
    );
};

const SearchResults = (props: Props) => {
    const { loading, error, data } = props;
    if (loading || error) {
        return (
            <Box
                style={{ minHeight: 300 }}
                display={'flex'}
                textAlign={'center'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <LoadingAndError loading={true} error={false} />
            </Box>
        );
    } else if (data) {
        const { constituecyCandidates, partyCandidates, parties } = data;
        const isNoResult = constituecyCandidates.length === 0 && partyCandidates.length === 0 && parties.length === 0;

        if (isNoResult) {
            return <EmptySearchResult />;
        }
        return (
            <Box>
                <Grid container spacing={2}>
                    <ConstituecyCandidatesSearchResults {...data} />
                    <PartyCandidatesSearchResults {...data} />
                    <PartiesSearchResults {...data} />
                </Grid>
            </Box>
        );
    }
    return <EmptySearchResult customResultTitle={'在以上的搜尋欄，可以查詢立委和政黨喔'} />;
};

export default SearchResults;
