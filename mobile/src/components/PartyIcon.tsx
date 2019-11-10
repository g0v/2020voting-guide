import { Box, Typography } from '@material-ui/core';
import React from 'react';

interface PartyColor {
    main: string;
    secondary?: string;
    text?: string;
}

const colors: {
    [key: string]: PartyColor;
} = {
    民主進步黨: { main: '#1B9431' },
    中國國民黨: { main: '#000099' },
    時代力量: { main: '#FBBE01' },
    國會政黨聯盟: { main: '#E60012', secondary: '#FFF100' },
    台灣基進: { main: '#A73F24' },
    綠黨: { main: '#73BE00', secondary: '#FFFF00' },
    親民黨: { main: '#FF6310' },
    台灣維新: { main: '#51448D' },
    無黨團結聯盟: { main: '#C20F51' },
    社會民主黨: { main: '#FF0088' },
    台灣團結聯盟: { main: '#C69E6A' },
    安定力量: { main: '#5E3190' },
    一邊一國行動黨: { main: '#5BBDE0' },
    喜樂島: { main: '#009E96' },
    宗教聯盟: { main: '#EAD9A5' },
    無黨籍: { main: '#212121' },
    其他: { main: '#AEAEAE' }
};

export const RectangleIcon = ({ party }: { party: string }) => {
    const partyColor = colors[party] || colors['其他'];
    if ('secondary' in partyColor) {
        return (
            <Box
                borderRadius="5px"
                textAlign="center"
                borderBottom={`3px solid ${partyColor.secondary}`}
                bgcolor={partyColor.main}
                color={partyColor.text || 'white'}
                px="6px"
                py="2px"
            >
                <Typography variant="h5">{party}</Typography>
            </Box>
        );
    }
    return (
        <Box
            borderRadius="5px"
            bgcolor={partyColor.main}
            textAlign="center"
            color={partyColor.text || 'white'}
            px="6px"
            py="2px"
        >
            <Typography variant="h5">{party}</Typography>
        </Box>
    );
};

export const CircleIcon = ({ party }: { party: string }) => {
    const partyColor = colors[party] || colors['其他'];
    if ('secondary' in partyColor) {
        return (
            <Box
                height={15}
                display="inline-box"
                width={15}
                borderRadius="50%"
                border={`7px solid ${partyColor.main}`}
                bgcolor={partyColor.secondary}
            />
        );
    }
    return (
        <Box
            display="inline-box"
            height={15}
            width={15}
            borderRadius="50%"
            bgcolor={partyColor.main}
        />
    );
};
