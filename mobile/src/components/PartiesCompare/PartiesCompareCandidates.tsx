import Typography from '@material-ui/core/Typography';
import take from 'lodash/take';
import React from 'react';
import partyCandidates from '../../data/party_candidates_integrated.json';

type SingleCandidateInParty = {
    name: string;
    photo: string;
    party: string;
    constituency: string;
    rank: number;
    currentLegislator: false;
    isPast: false;
    birth: string;
    age: number;
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
    date_of_birth: string;
    sex: string;
    place_of_birth: string;
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
        <div className="candidate-compare-col parties-compare-candidates">
            <div className="h4 color-black mb-3 font-weight-500">
                本屆不分區提名
            </div>
            {candidates.map(
                (candidate: SingleCandidateInParty, idx: number) => {
                    const { name, age, experience } = candidate;
                    return (
                        <div
                            className="parties-compare-candidates-item mb-3"
                            key={name}
                        >
                            <div className="d-flex align-items-center">
                                <span className="h3 color-red mr-2">
                                    {idx + 1}
                                </span>
                                <span className="h4 mr-2 color-real-black">
                                    {name}
                                </span>
                                {age && (
                                    <div className="h5 color-gray">{age}歲</div>
                                )}
                            </div>
                            <div className="h5 color-gray text-overflow-1">
                                {experience.split(/。|\n|，/)[0]}
                            </div>
                        </div>
                    );
                }
            )}
            <a href={`/party/${name}`} className="btn btn-rounded">
                完整不分區名單
            </a>
        </div>
    );
}
