import { Box, Link, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import React from 'react';
import {
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis
} from 'recharts';
import ccw from '../../data/ccw.json';
import overallStatistic from '../../data/overall_statistic.json';
import proposeTimes from '../../data/propose_times.json';
import Alert from '../Alert';
import BasePaper from '../BasePaper';
import Issue from '../Issue';
import BigNum from '../Numbers/BigNum';
import AppBarChart from './AppBarChart';

function isKeyof<T extends object>(
    obj: T,
    possibleKey: keyof any
): possibleKey is keyof T {
    return possibleKey in obj;
}

function getCCW(name: string) {
    if (name.startsWith('廖國棟') || name.startsWith('鄭天財')) {
        name = name.substring(0, 3);
    }
    if (isKeyof(ccw, name)) {
        return ccw[name];
    } else {
        return ccw['null'];
    }
}

const proposeData = proposeTimes
    .map(item => {
        return {
            name: item.name,
            count: item.count,
            percent: (Number(item.count) * 100) / Number(proposeTimes[0].count)
        };
    })
    .reverse();

const Statistic: {
    sittingRate: number;
    interpellationRate: number;
    interpellationNum: number;
    billProposalNum: number;
    interpellation: [];
    billProposal: [];
    contribution: {
        [key: string]: number;
    };
    otherConstituencyCandidate: {
        name: string;
        totalIncome: number;
        totalExpense: number;
    }[];
} = {
    sittingRate: 0,
    interpellationRate: 0,
    interpellationNum: 0,
    billProposalNum: 0,
    interpellation: [],
    billProposal: [],
    contribution: {
        totalIncome: 0,
        personalContributeion: 0,
        profitableContributeion: 0,
        partyContributeion: 0,
        civilOrganizationsContributeion: 0,
        anonymousContributeion: 0,
        otherContributeion: 0,
        overThrityThousandContribute: 0,
        totalExpense: 0
    },
    otherConstituencyCandidate: []
};
interface PositionTab {
    name?: string;
    constituency?: string;
    interpellationCategory?: { name: string; value: number }[];
    billNumCategory?: { name: string; percent: number }[];
    padding?: object;
}

const useStyle = makeStyles({
    expandButton: {
        borderRadius: '50%',
        border: '1px solid rgba(0, 0, 0, 0.15)'
    }
});

const getPercentage = (num: number) => {
    return (num * 100).toFixed(2);
};

const PositionTab = ({
    name = '',
    constituency = '',
    padding
}: PositionTab) => {
    const theme = useTheme();
    const classes = useStyle();
    const [showMoreInterpellation, setMoreInterpellation] = React.useState(
        false
    );
    const [statistic, setStatistic] = React.useState(Statistic);

    React.useEffect(() => {
        if (!name) return;
        if (name.startsWith('廖國棟') || name.startsWith('鄭天財')) {
            name = name.substring(0, 3);
        }
        fetch(`/api/statistic/${name}`)
            .then(res => res.json())
            .then(res => setStatistic(res));
    }, [name]);

    return (
        <Box bgcolor="#F7F7F7" py={1} style={padding}>
            <Box mb={2}>
                <Alert>
                    <span>{`以下是 2016-2019 年${name}擔任立法委員的紀錄。`}</span>
                    <br />
                    <span>
                        {`資料來源: `}
                        <Link href="https://npl.ly.gov.tw/do/www/homePage">
                            立法院國會圖書館
                        </Link>
                    </span>
                    <br />
                    <span>
                        {`資料來源: `}
                        <Link href="https://ccw.org.tw/">公督盟</Link>
                        由田君陽提供
                    </span>
                </Alert>
            </Box>

            <BasePaper
                title="法律草案"
                subtitle="立委需要研究法案與各式社會發展，提案修正國家法律"
            >
                <Box my={4}>
                    <Typography variant="h3">主提案修法數量</Typography>
                    <BigNum
                        num={statistic.billProposalNum}
                        unit="件"
                        text1=""
                        text2=""
                    />
                </Box>
                <Box marginTop={-10}>
                    <ResponsiveContainer width="100%" height={150}>
                        <BarChart
                            data={proposeData}
                            margin={{
                                top: 0,
                                right: 10,
                                bottom: 20,
                                left: 10
                            }}
                            reverseStackOrder={true}
                        >
                            <Bar dataKey="percent">
                                {proposeData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            entry.name === name
                                                ? '#3199BA'
                                                : '#E5E5E5'
                                        }
                                    />
                                ))}
                            </Bar>
                            <Tooltip />
                            <XAxis
                                dataKey="count"
                                minTickGap={10}
                                interval={10}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </BasePaper>
            <Box px={1.5} pt={1}>
                <Issue name="質詢" />
            </Box>
            <Box p={1} bgcolor={theme.palette.background.default} />
            <Box px={2.5} py={3} mb={1} bgcolor="#FFFFFF">
                <Box my={4}>
                    <Typography variant="h3">質詢次數</Typography>
                    <BigNum
                        num={statistic.interpellationNum}
                        unit="次"
                        text1=""
                        text2=""
                    />
                </Box>
                <Typography variant="h3">質詢類別</Typography>
                <Typography variant="h5" color="textSecondary">
                    立法委員要針對行政院的施政進行監督詢答
                </Typography>
                <AppBarChart
                    data={statistic.interpellation}
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
            </Box>
            <Box px={1.5} pt={1}>
                <Issue name="出席" />
            </Box>
            <Box p={1} bgcolor={theme.palette.background.default} />
            <Box px={2.5} py={3} bgcolor="#FFFFFF">
                <Box pb={1}>
                    <Typography variant="h2">委員會出席率</Typography>
                </Box>
                <BigNum
                    num={Number(getPercentage(statistic.sittingRate))}
                    unit="%"
                    text1={`立委平均 ${getPercentage(
                        overallStatistic.overallSittingRate
                    )}%`}
                    text2={`中位數 ${getPercentage(
                        overallStatistic.mediumSittingRate
                    )}%`}
                />
            </Box>
            <BasePaper
                title="法案及預算審查委員會"
                subtitle="在法案及預算審查時有掌握發言機會表達意見的比率"
            >
                <BigNum
                    num={Number(getPercentage(getCCW(name).engagementRate))}
                    unit="%"
                    text1={`立委平均 ${getPercentage(
                        overallStatistic.overallEngagementRate
                    )}%`}
                    text2={`中位數 ${getPercentage(
                        overallStatistic.medianEngagementRate
                    )}%`}
                />
            </BasePaper>
            <Box px={1.5} pt={1}>
                <Issue name="公督盟評鑑" />
            </Box>
            <Box p={1} bgcolor={theme.palette.background.default} />
            <Box px={2.5} py={3} bgcolor="#FFFFFF">
                <Box pb={1}>
                    <Typography variant="h2">第九屆優秀立委</Typography>
                </Box>
                <BigNum
                    num={Number(getCCW(name).excellentLegislatorNum)}
                    unit="次"
                    text1={`總共評鑑 7 次`}
                    text2={''}
                />
            </Box>
            <Box px={2.5} py={3} bgcolor="#FFFFFF" marginBottom={2}>
                <Box pb={1}>
                    <Typography variant="h2">第九屆待觀察立委</Typography>
                </Box>
                <BigNum
                    num={Number(getCCW(name).observedLegislatorNum)}
                    unit="次"
                    text1={`總共評鑑 7 次`}
                    text2={''}
                />
            </Box>
            <Box p={2} bgcolor={theme.palette.background.default} />
        </Box>
    );
};

export default PositionTab;
