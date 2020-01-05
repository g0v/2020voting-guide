import React from 'react';
import Typography from '@material-ui/core/Typography';
import take from 'lodash/take';

import partyCandidates from '../../data/party_candidates.json';

type SingleCandidateInParty = {
    name: string;
    photo: string;
    party: string;
    constituency: string;
    rank: number;
    currentLegislator: boolean;
    isPast: boolean;
    birth: string;
    age: number | string;
    wiki: string;
    fbPage: string;
    education: string;
    educationConnection: string;
    experience: string;
    experienceConnection: string;
    politics: string;
    politicsConnection: string;
    others: string;
    unvarifiedEducation: string;
    unvarifiedPolitics: string;
};
interface Props {
    name: string;
}
interface PartyCandidates {
    [key: string]: SingleCandidateInParty[];
}

export default function PartiesCompareCandidates({ name }: Props) {
    const candidates: SingleCandidateInParty[] = take(
        (partyCandidates as PartyCandidates)[name],
        7
    );
    return (
        <div className="parties-compare-candidates">
            <Typography variant="h3">本屆不分區提名</Typography>
            {candidates.map(
                (candidate: SingleCandidateInParty, idx: number) => {
                    const { name, age, experience } = candidate;
                    return (
                        <div
                            className="parties-compare-candidates-item mb-4"
                            key={name}
                        >
                            <div className="d-flex align-items-center">
                                <span className="h3 color-red mr-2">
                                    {idx + 1}
                                </span>
                                <span className="h4 mr-1">{name}</span>
                                {age && (
                                    <div className="h5 color-gray">{age}歲</div>
                                )}
                            </div>
                            <div className="h5 color-gray text-overflow-1">
                                {experience}
                            </div>
                        </div>
                    );
                }
            )}
            <div>
                <a
                    href={`/party/${name}`}
                    className="btn btn-rounded parties-compare-link-btn"
                >
                    完整不分區名單
                </a>
            </div>
        </div>
    );
}
