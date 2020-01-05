import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import DeleteButton from '../CandidateCompare/DeleteButton';

interface Props {
    name: string;
    currentCandidateCount: number;
    onDelete: (name: string) => void;
}

const PartiesCompareCardHeaderFixed = ({
    name,
    onDelete,
    currentCandidateCount
}: Props) => {
    return (
        <div className="candidate-compare-card py-0">
            <div className="candidate-compare-header candidate-compare-header--fixed">
                <Typography variant="h3" color="textSecondary">
                    {name}
                </Typography>
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

export default PartiesCompareCardHeaderFixed;
