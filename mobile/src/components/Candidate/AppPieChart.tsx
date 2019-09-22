import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface AppPieChart {
    data: { name: string; percent: number }[];
}

const AppPieChart = ({ data }: AppPieChart) => {
    const theme = useTheme();
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
    }: {
        cx?: any;
        cy?: any;
        midAngle?: any;
        innerRadius?: any;
        outerRadius?: any;
        percent?: any;
        index?: any;
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = 25 + innerRadius + (outerRadius - innerRadius);
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill={theme.palette.primary.main}
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontFamily={theme.typography.fontFamily}
                fontSize="14"
            >
                {data[index].name} {percent}%
            </text>
        );
    };
    return (
        <>
            <Box width="100%" height={190} mx="auto" my={5}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            dataKey="percent"
                            isAnimationActive={false}
                            data={data}
                            fill={theme.palette.primary.main}
                            label={renderCustomizedLabel}
                            outerRadius={65}
                        />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
};

export default AppPieChart;
