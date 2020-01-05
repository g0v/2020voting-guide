import { List, Container, Typography, Box } from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import parties from '../../data/party.json';
import Navigation from '../Navigation';
import PartyCard from './PartyCard';
import CompareBTN from '../ConstituencyCandidates/CompareBTN';
import CandidateCardWrap from '../ConstituencyCandidates/CandidateCardWrap';

import './PartyCandidates.scss';

const PartyCandidates = () => {
    const [selectMode, setSelectMode] = useState<boolean>(false);
    const [selectParties, setSelectParties] = useState<string[]>([]);

    const onLocationHrefClick = useCallback(() => {
        window.location.href = `/parties/compare/${selectParties.toString()}`;
    }, [selectParties]);

    const toggleSelectMode = useCallback(
        () => setSelectMode((prev: boolean) => !prev),
        []
    );

    const rootClazz: string = clsx('party-candidates p-0', {
        'is-select': selectMode
    });
    const onCandidateCardWrapClick = useCallback(
        (party: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (!selectMode) {
                return;
            }
            event.preventDefault();
            const { name } = party;
            setSelectParties((prev: string[]) => {
                const indexOf: number = prev.indexOf(name);
                if (indexOf === -1) {
                    return [...prev, name];
                } else {
                    prev.splice(indexOf, 1);
                    return [...prev];
                }
            });
        },
        [selectMode]
    );
    return (
        <Container className={rootClazz}>
            <div
                onClick={onLocationHrefClick}
                className={clsx('party-candidates__submit-btn cursor-pointer', {
                    'is-show': selectMode,
                    'is-disabled': selectParties.length < 2
                })}
            >
                <span>開始比較</span>
            </div>
            <div className="party-candidates__header">
                <Navigation title="不分區參選政黨">
                    <Typography variant="subtitle1" color="textSecondary">
                        由得票超過5%的政黨依得票比例來分配34席
                    </Typography>
                </Navigation>
                <CompareBTN
                    selectMode={selectMode}
                    onClick={toggleSelectMode}
                    label="比較政黨"
                />
            </div>
            <Box px={2}>
                <List>
                    {parties.map(party => (
                        <CandidateCardWrap
                            key={party.name}
                            onClick={event =>
                                onCandidateCardWrapClick(party, event)
                            }
                            selectIndex={selectParties.indexOf(party.name)}
                            selectMode={selectMode}
                        >
                            <div className="candidate-card__inner transition">
                                <PartyCard {...party} />
                            </div>
                        </CandidateCardWrap>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default PartyCandidates;
