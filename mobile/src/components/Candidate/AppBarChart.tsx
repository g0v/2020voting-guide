import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import { Bar, BarChart, XAxis, YAxis, LabelList } from 'recharts';

interface AppBarChart {
    data: { name: string; value: number }[];
    showMore: boolean;
}

const fakeData = [
    {
        name: '內政',
        term: 9,
        count: 12
    },
    {
        name: '外交僑務',
        term: 9,
        count: 2
    },
    {
        name: '國防退輔',
        term: 9,
        count: 4
    },
    {
        name: '財政金融',
        term: 9,
        count: 9
    },
    {
        name: '教育',
        term: 9,
        count: 36
    },
    {
        name: '法務',
        term: 9,
        count: 9
    },
    {
        name: '經濟貿易',
        term: 9,
        count: 0
    },
    {
        name: '交通建設',
        term: 9,
        count: 11
    },
    {
        name: '勞動人力',
        term: 9,
        count: 5
    },
    {
        name: '農業',
        term: 9,
        count: 9
    },
    {
        name: '衛生社福',
        term: 9,
        count: 9
    },
    {
        name: '環境資源',
        term: 9,
        count: 8
    },
    {
        name: '文化觀光',
        term: 9,
        count: 11
    },
    {
        name: '國家發展',
        term: 9,
        count: 5
    },
    {
        name: '科技',
        term: 9,
        count: 0
    },
    {
        name: '海洋',
        term: 9,
        count: 0
    },
    {
        name: '原住民族',
        term: 9,
        count: 1
    },
    {
        name: '客家',
        term: 9,
        count: 1
    },
    {
        name: '主計',
        term: 9,
        count: 1
    },
    {
        name: '人事其他',
        term: 9,
        count: 2
    },
    {
        name: '總統',
        term: 9,
        count: 0
    },
    {
        name: '立法',
        term: 9,
        count: 4
    },
    {
        name: '司法',
        term: 9,
        count: 1
    },
    {
        name: '考試',
        term: 9,
        count: 0
    },
    {
        name: '監察',
        term: 9,
        count: 0
    }
];

const AppBarChart = ({ data, showMore }: AppBarChart) => {
    const theme = useTheme();
    const [barWidth, setBarWidth] = React.useState(375);
    const divRef = React.createRef<HTMLDivElement>();

    const renderCustomizedLabel = (props: any) => {
        console.log(props);

        const { x, y, width, height, value } = props;

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
                    data={fakeData
                        .sort((a, b) => b.count - a.count)
                        .slice(0, showMore ? fakeData.length : 5)}
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
