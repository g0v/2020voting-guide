import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';

const NoInfoTab = ({ name, from }: { name: string; from: string }) => {
    const theme = useTheme();
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
                src="/img/doll_new_candidate.svg"
                alt="2020/1/11,台灣總選大選投票日"
            />
            <Box py={4}>
                <Typography variant="h4" color="textSecondary">
                    原來{name}不是上屆立委阿！
                </Typography>
            </Box>
            <Typography variant="h5" color="textSecondary">
            {from === 'issueBill' ?
                (<Box lineHeight={2}>
                這個候選人沒有法案紀錄
                    <br />
                    加入的政黨也沒有法案紀錄
                    <br />
                    透過其他方法認識他
                </Box>)
            : from === 'passPerformance' ?
            (<Box lineHeight={2}>
                這個候選人沒有立委紀錄
                    <br />
                    透過其他方法認識他
                </Box>) : null
            }
            </Typography>
        </Box>
    );
};

export default NoInfoTab;
