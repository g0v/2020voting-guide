import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';

const NoInfoTab = ({ name, from }: { name: string; from: string }) => {
    const theme = useTheme();
    let img, primary, secondary;
    if (from === 'issueBill') {
        img = '/img/doll/new_candidate.svg';
        primary = `原來${name}不是上屆立委阿！`;
        secondary = (
            <Box lineHeight={2}>
                這個候選人沒有法案紀錄
                <br />
                加入的政黨也沒有法案紀錄
                <br />
                透過其他方法認識他
            </Box>
        );
    } else if (from === 'passPerformance') {
        img = '/img/doll/new_candidate.svg';
        primary = `原來${name}不是上屆立委阿！`;
        secondary = (
            <Box lineHeight={2}>
                這個候選人沒有立委紀錄
                <br />
                透過其他方法認識他
            </Box>
        );
    } else if (from === 'basicInfo') {
        img = '/img/doll/no_basic_info.svg';
        primary = '經歷政見還沒公告，再等一下！';
        secondary = (
            <Box lineHeight={2}>
                目前沒有本次政見資訊
                <br />
                看看這個候選人過去的政見
            </Box>
        );
    }

    return (
        <Box
            bgcolor={theme.palette.background.default}
            height="100vh"
            textAlign="center"
            py={5}
        >
            <img
                width="150"
                height="150"
                src={img}
                alt="2020/1/11,台灣總選大選投票日"
            />
            <Box py={4}>
                <Typography variant="h4" color="textSecondary">
                    {primary}
                </Typography>
            </Box>
            <Typography variant="h5" color="textSecondary">
                {secondary}
            </Typography>
        </Box>
    );
};

export default NoInfoTab;
