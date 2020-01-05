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
                <div className="h4 mb-2">學歷</div>
                <Typography variant="h5" color="textSecondary">
                    {responseData.education || '即將更新'}
                </Typography>
                <div className="mb-3"></div>
                <div className="h4 mb-2">經歷</div>
                <Typography variant="h5" color="textSecondary">
                    {responseData.experience || '即將更新'}
                </Typography>
                {(responseData.education || responseData.experience) && (
                    <div className="mt-auto">
                        <a
                            className="btn btn-rounded"
                            href={`/candidate/${constituency}/${name}?tab=3`}
                        >
                            詳細學經歷
                        </a>
                    </div>
                )}
            </>
        );
    }
    return (
        <div
            className={clsx(
                'candidate-compare-col candidate-compare-education loading style-flex',
                { 'is-show': isLoading }
            )}
        >
            {child}
        </div>
    );
}
