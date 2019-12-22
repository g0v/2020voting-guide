import { IconButton } from '@material-ui/core';
import React from 'react';
import useFetch from '../../hooks/useFetch';
import { makeStyles } from '@material-ui/styles';
import { CandidateType } from '../Candidate/Candidate';
import Typography from '@material-ui/core/Typography';
import DeleteButton from './DeleteButton';

import clsx from 'clsx';

interface Props {
    name: string;
    currentCandidateCount: number;
    constituency: string;
    onDelete: (name: string) => void;
}

const CandidateCompareCardHeader = ({
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
                <Typography variant="h3" color="textSecondary">
                    {name}
                </Typography>
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

export default CandidateCompareCardHeader;
