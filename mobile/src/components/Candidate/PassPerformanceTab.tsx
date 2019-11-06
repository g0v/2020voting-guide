import { Box, Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import BasePaper from '../BasePaper';
import Bulletin from '../Bulletin';
import BigNum from '../Numbers/BigNum';
import AppPieChart from './AppPieChart';
import AppBarChart from './AppBarChart';

const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 }
];

interface PositionTab {
    name?: string;
    lastTerm?: string;
    lastTermYear?: string;
    sittingRate?: number;
    interpellationRate?: number;
    interpellationCategory?: { name: string; value: number }[];
    billNumCategory?: { name: string; percent: number }[];
}

const useStyle = makeStyles({
    expandButton: {
        borderRadius: '50%',
        border: '1px solid rgba(0, 0, 0, 0.15)'
    }
});

const PositionTab = ({
    name,
    lastTerm,
    lastTermYear,
    sittingRate = 0,
    interpellationRate = 0,
    interpellationCategory = [],
    billNumCategory = []
}: PositionTab) => {
    const theme = useTheme();
    const classes = useStyle();
    const [showMoreInterpellation, setMoreInterpellation] = React.useState(
        false
    );
    const [interpellationData, setinterpellationData] = React.useState([]);

    React.useEffect(() => {
        fetch(`/api/statistic/${name}`)
            .then(res => res.json())
            .then(setinterpellationData);
    }, [name]);

    return (
        <>
            <Bulletin
                primary={`${name} 曾擔任 ${lastTerm}`}
                secondary={lastTermYear}
            />
            {/* <BasePaper
                title="立法院出席率"
                subtitle="立委應於指定開會時間出席立法院開會、質詢、審議法案"
            >
                <BigNum
                    num={sittingRate}
                    unit="%"
                    text1="立委平均數 91%"
                    text2="中位數 89%"
                />
            </BasePaper> */}
            <Box p={1} bgcolor={theme.palette.background.default} />
            <BasePaper
                title="質詢"
                subtitle="立法委員要針對行政院的施政進行監督詢答"
            >
                {/* <Box my={4}>
                    <Typography variant="h3">質詢率</Typography>
                    <BigNum
                        num={interpellationRate}
                        unit="%"
                        text1="180 次 / 210 次質詢機會"
                        text2="立委平均 91%"
                    />
                </Box> */}
                <Typography variant="h3">質詢類別</Typography>
                <Typography variant="h5" color="textSecondary">
                    立法委員要針對行政院的施政進行監督詢答
                </Typography>
                <AppBarChart
                    data={interpellationData}
                    showMore={showMoreInterpellation}
                />
                <Box display="flex" justifyContent="center">
                    <IconButton
                        aria-label="expand"
                        onClick={() =>
                            setMoreInterpellation(!showMoreInterpellation)
                        }
                    >
                        {showMoreInterpellation ? (
                            <ExpandLessRoundedIcon
                                className={classes.expandButton}
                            />
                        ) : (
                            <ExpandMoreRoundedIcon
                                className={classes.expandButton}
                            />
                        )}
                    </IconButton>
                </Box>
                {/* <Typography variant="h5">立法院： 吳思姚質詢影音</Typography> */}
            </BasePaper>
            <Box p={1} bgcolor={theme.palette.background.default} />
            {/* <BasePaper
                title="修法"
                subtitle="立委需要研究法案雨各式社會發展，提案修正國家法律"
            >
                <Box my={4}>
                    <Typography variant="h3">主題案修法數量</Typography>
                    <BigNum
                        num={83}
                        unit="件"
                        text1="立委平均數 92%"
                        text2="中位數 88%"
                    />
                </Box>
                <Typography variant="h3">最多主提案修法類別</Typography>
                <AppPieChart data={billNumCategory} />
                <Typography variant="h5">
                    立法院： 吳思姚法案主題案影音
                </Typography>
            </BasePaper> */}
            <Box p={1} bgcolor={theme.palette.background.default} />
            {/* <BasePaper title="政治現金紀錄" subtitle="每年收到的捐款和使用方式">
                <Typography variant="h3">吳思姚 收入</Typography>
                <Box width="100%" height={230} mx="auto">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data01}
                                fill={theme.palette.primary.main}
                                startAngle={180}
                                endAngle={0}
                                cy="70%"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
                <Typography variant="h3">吳思姚 支出</Typography>
                <Box width="100%" height={230} mx="auto">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data01}
                                fill={theme.palette.primary.main}
                                startAngle={180}
                                endAngle={0}
                                cy="70%"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
                <Typography variant="h5">
                    立法院： 吳思姚法案主題案影音
                </Typography>
            </BasePaper> */}
            <Box p={1} bgcolor={theme.palette.background.default} />
        </>
    );
};

export default PositionTab;
