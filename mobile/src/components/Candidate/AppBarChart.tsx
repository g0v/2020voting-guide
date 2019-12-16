import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import { Bar, BarChart, XAxis, YAxis, LabelList } from 'recharts';

interface AppBarChart {
    data: { name: string; value: number; count: number }[];
    showMore: boolean;
}

const AppBarChart = ({ data, showMore }: AppBarChart) => {

    const theme = useTheme();
    const [barWidth, setBarWidth] = React.useState(375);
    const divRef = React.createRef<HTMLDivElement>();

    const renderCustomizedLabel = (props: any) => {
        const { y, width, value } = props;

        return (
            <text
                x={87}
                y={y}
                fill={width > 10 ? '#fff' : '#000'}
                textAnchor="middle"
                dominantBaseline="hanging"
                fontFamily={theme.typography.fontFamily}
                fontSize="12"
            >
                {value}
            </text>
        );
    };

    React.useEffect(() => {
        if (divRef.current) {
            setBarWidth(divRef.current.clientWidth);
        }
    }, [divRef]);

    return (
        <div ref={divRef}>
            <Box
                width="100%"
                height="100%"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <BarChart
                    width={barWidth - 44}
                    height={showMore ? 500 : 110}
                    layout="vertical"
                    data={data
                        .sort((a, b) => b.count - a.count)
                        .slice(0, showMore ? data.length : 5)}
                >
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        interval={0}
                        width={72}
                        padding={{ top: 10, bottom: 0 }}
                        axisLine={false}
                        tickLine={false}
                        stroke="#000"
                    />
                    <Bar dataKey="count" fill={theme.palette.primary.main}>
                        <LabelList
                            dataKey="count"
                            position="insideLeft"
                            content={renderCustomizedLabel}
                        />
                    </Bar>
                </BarChart>
            </Box>
        </div>
    );
};

export default AppBarChart;
