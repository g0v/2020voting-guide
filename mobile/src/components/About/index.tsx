import { Box, Typography } from '@material-ui/core';
import React from 'react';

const About = () => (
    <Box px={2} py={3}>
        <Typography variant="h2" paragraph>
            關於我們
        </Typography>
        <Box textAlign="center" py={3}>
            <img src="/img/doll/about.svg" alt="about us" />
        </Box>
        <Typography variant="h3" gutterBottom>
            <Box fontWeight="600">選前抱佛腳，投下有價值的一票</Box>
        </Typography>
        <Typography variant="h4">
            立委候選人那麼多，謠言滿天飛，人們需要公開透明的資訊整合平台。
            <br />
            選前大補帖網站提供現任立委的出席、質詢、提案紀錄，並整理所有候選人的競選資訊，讓你不用看密密麻麻的選舉公報也能做出明確的判斷。
            <br />
            除了量性的資料外，網站也加入「法案議題」的質性資料，讓你能依照自己關注的議題對照立委提出的法案，理性判斷候選人和政黨，為自己的生活投下有價值的一票。
        </Typography>
        <br />
        <Box py={2}>
            <img src="/img/g0v_width.svg" alt="g0v" />
        </Box>
        <Box textAlign="center" py={3}>
            <img src="/img/doll/vote.svg" alt="vote" />
        </Box>
        <Typography variant="h3" gutterBottom>
            <Box fontWeight="600">選前大補帖幕後團隊</Box>
        </Typography>
        <Typography variant="h4">
            我們的團隊成員來自設計、資工、行銷等領域，在 2019 年 5 月發跡於 g0v
            零時政府所舉辦的黑客松。團隊成員皆是自發無償製作，並且開放所有原始碼，希望能夠推動台灣社會的公民素養和理性思考的風氣。
        </Typography>
    </Box>
);

export default About;
