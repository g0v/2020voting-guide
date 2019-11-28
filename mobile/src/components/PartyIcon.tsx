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
    中國國民黨: { main: '#000099' },
    民主進步黨: { main: '#1B9431' },
    台灣民眾黨: { main: '#0CB5B5' },
    時代力量: { main: '#FBBE01' },
    國會政黨聯盟: { main: '#E60012', secondary: '#FFF100' },
    新黨: { main: '#1C298B', secondary: '#FFDA00' },
    台灣基進: { main: '#A73F24' },
    綠黨: { main: '#73BE00', secondary: '#FFFF00' },
    親民黨: { main: '#FF6310' },
    台灣維新: { main: '#51448D' },
    無黨團結聯盟: { main: '#C20F51' },
    社會民主黨: { main: '#FF0088' },
    台灣團結聯盟: { main: '#C69E6A' },
    安定力量: { main: '#5E3190' },
    一邊一國行動黨: { main: '#5BBDE0' },
    喜樂島聯盟: { main: '#009E96' },
    宗教聯盟: { main: '#EAD9A5' },
    無黨籍: { main: '#212121' },
    其他: { main: '#AEAEAE' }
};

export const RectangleIcon = ({ party }: { party: string }) => {
    let partyColor
    if (party.length === 0) {
        partyColor = colors['無黨籍'];
        party = '無黨籍'
    } else {
        partyColor = colors[party] || colors['其他'];
    }
    
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
                height={13}
                display="inline-box"
                width={13}
                ml={0.5}
                borderRadius="2px"
                border={`7px solid ${partyColor.main}`}
                bgcolor={partyColor.secondary}
            />
        );
    }
    return (
        <Box
            display="inline-box"
            height={13}
            width={13}
            ml={0.5}
            borderRadius="2px"
            bgcolor={partyColor.main}
        />
    );
};
