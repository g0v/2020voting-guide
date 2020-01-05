import { Avatar, IconButton } from '@material-ui/core';
import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import partiesData from '../../data/party.json';
import { PartyCard as PartyCardType } from '../PartyCandidates/PartyCard';
import clsx from 'clsx';
import find from 'lodash/find';

interface Props {
    name: string;
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

const PartiesCompareCardHeader = ({
    name,
    onDelete,
    currentCandidateCount
}: Props) => {
    const classes = useStyles();
    const onCloseClick = useCallback(() => onDelete(name), []);

    const partyData: PartyCardType = find(partiesData, {
        name
    }) as PartyCardType;

    const { regionalLegislatorsNum, electedPersonNum, voteRate } = partyData;

    const totalElectedPerson: number =
        regionalLegislatorsNum + electedPersonNum;
    const isElectedPersonZero: boolean = totalElectedPerson <= 0;
    return (
        <div className="candidate-compare-header parties-compare-header">
            <IconButton
                className={clsx('candidate-compare-header-close-btn', {
                    'd-none': currentCandidateCount <= 2
                })}
                onClick={onCloseClick}
            >
                <CloseIcon />
            </IconButton>
            <Avatar src={partyData.logo} className={classes.photo} />
            <div>
                <Typography variant="h3" color="textSecondary">
                    {name}
                </Typography>
            </div>
            <div>
                <div
                    className={clsx('candidate-compare-header-current', {
                        'style-gray': isElectedPersonZero
                    })}
                />
                <span>
                    {isElectedPersonZero
                        ? '無現任立委'
                        : `現任 ${totalElectedPerson} 席`}
                </span>
            </div>
            {!isElectedPersonZero && (
                <div className="font-thumb color-gray">
                    {electedPersonNum} 席不分區、{regionalLegislatorsNum} 席區域
                </div>
            )}
            <div className="font-thumb color-gray">上屆得票率 {voteRate}</div>
        </div>
    );
};

export default PartiesCompareCardHeader;
