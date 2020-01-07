import { Avatar, IconButton } from '@material-ui/core';
import React from 'react';
import useFetch from '../../hooks/useFetch';
import { RectangleIcon } from '../PartyIcon';
import { makeStyles } from '@material-ui/styles';
import { CandidateType } from '../Candidate/Candidate';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import clsx from 'clsx';

interface Props {
    name: string;
    constituency: string;
    currentCandidateCount: number;
    onDelete: (name: string) => void;
}
const useStyles = makeStyles({
    photo: {
        width: 76,
        height: 76,
        fontSize: 40,
        marginBottom: 16
    }
});

const CandidateCompareCardHeader = ({
    name,
    constituency,
    onDelete,
    currentCandidateCount
}: Props) => {
    const { isLoading, responseData } = useFetch<CandidateType>(
        `/api/candidate/${constituency}/${name}`,
        {},
        [name]
    );
    const classes = useStyles();
    const onCloseClick = React.useCallback(() => {
        onDelete(name);
    }, []);

    const { photo, party, age }: CandidateType = responseData;
    const ageDisplay = age === 0 ? '未知年齡' : `${age} 歲`;
    return (
        <div
            className={clsx('candidate-compare-header loading', {
                'is-show': isLoading
            })}
        >
            <IconButton
                className={clsx('candidate-compare-header-close-btn', {
                    'd-none': currentCandidateCount <= 2
                })}
                onClick={onCloseClick}
            >
                <CloseIcon />
            </IconButton>
            <Avatar src={photo} className={classes.photo}>
                {name.charAt(0)}
            </Avatar>
            <div className="d-flex align-items-center candidate-compare-header-name">
                <div className="h3 color-black mr-2 mb-2">{name}</div>
                <div className="h5 color-gray">{ageDisplay}</div>
                {responseData.currentLegislator && (
                    <Typography
                        variant="h5"
                        color="textSecondary"
                        className="ml-auto"
                    >
                        <span className="candidate-compare-header-current">
                            現任
                        </span>
                    </Typography>
                )}
            </div>
            {party && (
                <div className="d-inline-block">
                    <RectangleIcon party={party} />
                </div>
            )}
        </div>
    );
};

export default CandidateCompareCardHeader;
