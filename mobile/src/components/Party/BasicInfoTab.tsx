import React, { useState, FunctionComponent } from 'react';
import { DialogContent, Typography, Avatar, Box } from '@material-ui/core';
import { Position } from './types';
import Card from '../Card';
import Dialog from '../Dialog';

interface Props {
    party: string;
    positions: Position[];
    lastPolitics: string;
}

const Title: FunctionComponent<{ name: string }> = ({ name }) => (
    <Box ml={2} mb={1} display="flex" alignItems="center">
        <Box
            width="8px"
            height="24px"
            mr={1}
            borderRadius="4px"
            bgcolor="primary.main"
        />
        <Typography variant="h2">{name}</Typography>
    </Box>
);

const PositionCard: FunctionComponent<Position> = ({ name, position }) => (
    <Box flexBasis="50%" display="flex" alignItems="center">
        <Box mx={1} my={2}>
            <Avatar>{name.charAt(0)}</Avatar>
        </Box>
        <Box flexGrow="1">
            <Typography variant="body2" color="textSecondary">
                {position}
            </Typography>
            <Box>{name}</Box>
        </Box>
    </Box>
);

const FullCard: FunctionComponent = ({ children }) => (
    <Box py={2} px={1} mb={2} display="flex" flexWrap="wrap" bgcolor="white">
        {children}
    </Box>
);

const PreviousParty = ({ party }: { party: string }) => (
    <Box ml="auto">
        <Typography color="textSecondary" variant="body2">
            {party}
        </Typography>
    </Box>
);

const BasicInfoTab: FunctionComponent<Props> = ({
    party = '',
    lastPolitics = '',
    positions
}) => {
    const [open, setOpen] = useState(false);
    return (
        <Box width="100vw" bgcolor="#F7F7F7" py={3}>
            <Title name="政黨主要職位" />
            <FullCard>
                {positions.map(p => (
                    <PositionCard {...p} />
                ))}
            </FullCard>
            {lastPolitics && (
                <>
                    <Title name="政見" />
                    <Box p={1} onClick={() => setOpen(true)}>
                        <Card>
                            <Box mb={1}>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {`第 9 屆 不分區立委選舉`}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={0.5}>
                                <Typography> 上屆參選政見 </Typography>
                                {party === '綠黨' && (
                                    <PreviousParty party="綠黨與社會民主黨聯盟" />
                                )}
                            </Box>
                            <Box color="rgba(0, 0, 0, 0.54);" height="120px">
                                {`${lastPolitics.substring(0, 100)}...`}
                            </Box>
                        </Card>
                    </Box>
                    {open && (
                        <Dialog
                            top="上屆參選政見"
                            handleCloseClick={() => setOpen(false)}
                        >
                            <DialogContent>
                                <Box pb="72px">{lastPolitics}</Box>
                            </DialogContent>
                        </Dialog>
                    )}
                </>
            )}
        </Box>
    );
};

export default BasicInfoTab;
