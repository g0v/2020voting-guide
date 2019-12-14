import React from 'react';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import useFetch from '../../hooks/useFetch';
import { CandidateType } from '../Candidate/Candidate';

interface Props {
    name: string;
    constituency: string;
}
export default function CandidateCompareCardEducation({
    name,
    constituency
}: Props) {
    const { isLoading, responseData } = useFetch<CandidateType>(
        `/api/candidate/${constituency}/${name}`,
        {},
        [name]
    );

    let child = null;
    if (!isLoading) {
        child = (
            <>
                <Typography variant="h3" color="textSecondary">
                    政見
                </Typography>
                <Typography variant="h5" color="textSecondary">
                    {responseData.politics || '選前大補帖目前沒有政見歷資料'}
                </Typography>
                <div className="mt-auto">
                    {responseData.politics && (
                        <a
                            className="btn btn-rounded"
                            href={`/candidate/${constituency}/${name}?tab=3`}
                        >
                            完整政見
                        </a>
                    )}
                </div>
            </>
        );
    }
    return (
        <div
            className={clsx(
                'candidate-compare-col candidate-compare-political loading style-flex',
                { 'is-show': isLoading }
            )}
        >
            {child}
        </div>
    );
}
