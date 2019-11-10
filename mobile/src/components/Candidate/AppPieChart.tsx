import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Label } from 'recharts';

interface AppPieChart {
    data: { name: string; percent: number }[];
    text: string
}

const AppPieChart = ({ data, text }: AppPieChart) => {
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
        // const radius = 25 + innerRadius + (outerRadius - innerRadius);
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
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
                {data[index].name} {percent} %
            </text>
        );
    };
    return (
        <>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        dataKey="percent"
                        isAnimationActive={false}
                        data={data}
                        startAngle={180}
                        endAngle={0}
                        fill="#F2C94C"
                        label={renderCustomizedLabel}
                        labelLine={false}>
                    </Pie>
                    <text x="50%" y="150" dominant-baseline="middle" text-anchor="middle" fill="#F2C94C" fontSize="20">
                        {text}
                    </text>
                </PieChart>
            </ResponsiveContainer>
        </>
    );
};

export default AppPieChart;
