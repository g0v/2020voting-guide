import React from 'react';
import dayjs from 'dayjs';
import { Box, Typography } from '@material-ui/core';
const Countdown = () => {
    const diffDay: number = React.useMemo(
        () => Math.max(0, dayjs('2020/1/11').diff(dayjs(), 'day')),
        []
    );
    const days: number[] = Array.from(Array(50 - diffDay).keys());
    const dayDOM: JSX.Element[] = days.map((idx: number) => {
        return <span key={idx}>{50 - idx}</span>;
    });
    return (
        <Typography
            variant="h2"
            align="center"
            className="color-primary countdown"
        >
            <div className="countdown__content">
                <span>距離立委投票剩下</span>
                <div className="countdown__numbers">
                    00
                    <div className="countdown__numbers-inner">{dayDOM}</div>
                </div>
                <span>天</span>
            </div>
            <Box mt={2}>你準備好了嗎？</Box>
        </Typography>
    );
};

export default Countdown;
