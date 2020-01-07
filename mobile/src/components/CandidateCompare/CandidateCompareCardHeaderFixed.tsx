import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import useFetch from '../../hooks/useFetch';
import { CandidateType } from '../Candidate/Candidate';
import DeleteButton from './DeleteButton';

interface Props {
    name: string;
    currentCandidateCount: number;
    constituency: string;
    onDelete: (name: string) => void;
}

const CandidateCompareCardHeaderFixed = ({
    name,
    constituency,
    onDelete,
    currentCandidateCount
}: Props) => {
    const { responseData } = useFetch<CandidateType>(
        `/api/candidate/${constituency}/${name}`,
        {},
        [name]
    );
    return (
        <div className="candidate-compare-card py-0">
            <div className="candidate-compare-header candidate-compare-header--fixed">
                <div className="h3 color-black pl-3">{name}</div>
                {responseData.currentLegislator && (
                    <Typography variant="h5" color="textSecondary">
                        <span className="candidate-compare-header-current ml-2">
                            現任
                        </span>
                    </Typography>
                )}
                <IconButton
                    className={clsx('candidate-compare-header-close-btn', {
                        'd-none': currentCandidateCount <= 2
                    })}
                >
                    <DeleteButton name={name} onDelete={onDelete} />
                </IconButton>
            </div>
        </div>
    );
};

export default CandidateCompareCardHeaderFixed;
