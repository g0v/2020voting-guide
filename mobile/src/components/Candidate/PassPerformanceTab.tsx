import { Box, Link, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import React from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import overallStatistic from '../../data/overall_statistic.json';
import proposeTimes from '../../data/propose_times.json';
import Alert from '../Alert';
import BasePaper from '../BasePaper';
import BigNum from '../Numbers/BigNum';
import AppBarChart from './AppBarChart';
import CompareBarChart from './CompareBarChart';

const proposeData = proposeTimes.map(item => {
    return {
        name: item.name,
        count: item.count,
        percent: (Number(item.count) * 100) / Number(proposeTimes[0].count)
    }
}).reverse()

const contributionMappings: { [key: string]: string } = {
    personalContributeion: '個人捐贈',
    profitableContributeion: '營利事業捐贈',
    partyContributeion: '政黨捐贈',
    civilOrganizationsContributeion: '人民團體捐贈',
    anonymousContributeion: '匿名捐贈',
    otherContributeion: '其他'
}

const Statistic: {
    sittingRate: number;
    interpellationRate: number;
    interpellationNum: number;
    billProposalNum: number;
    interpellation: [];
    billProposal: [];
    contribution: {
        [key: string]: number;
    },
    otherConstituencyCandidate: {
        name: string;
        totalIncome: number;
        totalExpense: number
    }[]
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
    lastTerm?: string;
    constituency?: string;
    lastTermYear?: string;
    interpellationCategory?: { name: string; value: number }[];
    billNumCategory?: { name: string; percent: number }[];
}

const useStyle = makeStyles({
    expandButton: {
        borderRadius: '50%',
        border: '1px solid rgba(0, 0, 0, 0.15)'
    }
});

const getTenThousand = (num: number) => {
    return Math.floor(num / 10000)
}

const getPercentage = (num: number) => {
    return (num * 100).toFixed(2)
}

const PositionTab = ({
    name = '',
    constituency = ''
}: PositionTab) => {
    const theme = useTheme();
    const classes = useStyle();
    const [showMoreInterpellation, setMoreInterpellation] = React.useState(
        false
    );
    const [showMoreBillProposal, setMoreBillProposal] = React.useState(false);
    const [statistic, setStatistic] = React.useState(Statistic);

    let contributionIncome =

    Object.keys(contributionMappings).map((key: string) => {
        return {
            name: contributionMappings[key] || '',
            percent: Number(((statistic.contribution[key] / statistic.contribution.totalIncome) * 100).toFixed(2)) || 0
        }
    })
    .sort((a, b) => {
        return a.percent - b.percent
    })

    const hash = {
        'index': 0,
        'value': 0
    }

    contributionIncome.forEach((element, index, array) => {
        if (element.percent + hash.value < 10) {
            hash.value += element.percent;
            hash.index = index
        }
    });
    contributionIncome = [
        ...contributionIncome.slice(hash.index, contributionIncome.length),
        { name: '其他', percent: hash.value }
    ]

    React.useEffect(() => {
        if (!name) return;
        fetch(`/api/statistic/${name}`)
            .then(res => res.json())
            .then(res => setStatistic(res));
    }, [name]);

    return (
        <Box bgcolor="#F7F7F7" py={1}>
            <Box mb={2}>
                <Alert >
                <span>{`以下是 2016-2019 年${name}擔任立法委員的紀錄。`}</span>
                <br />
                <span>
                    {`資料來源: `}
                    <Link href="https://npl.ly.gov.tw/do/www/homePage">
                    立法院國會圖書館
                    </Link>
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
                            top: 0, right: 10, bottom: 20, left: 10,
                        }}
                        reverseStackOrder={true}>
                        <Bar dataKey="percent">
                        {
                            proposeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={ entry.name === name ? '#3199BA' : '#E5E5E5'} />
                            ))
                        }
                        </Bar>
                        <Tooltip />
                        <XAxis dataKey="count" minTickGap={10} interval={10}/>
                    </BarChart>
                </ResponsiveContainer>
                </Box>
                {/* <Typography variant="h3">最多主提案修法類別</Typography> */}
                {/* <AppBarChart
                    data={statistic.billProposal}
                    showMore={showMoreBillProposal}
                /> */}


                {/* <Box display="flex" justifyContent="center">
                    <IconButton
                        aria-label="expand"
                        onClick={() =>
                            setMoreBillProposal(!showMoreBillProposal)
                        }
                    >
                        {showMoreBillProposal ? (
                            <ExpandLessRoundedIcon
                                className={classes.expandButton}
                            />
                        ) : (
                            <ExpandMoreRoundedIcon
                                className={classes.expandButton}
                            />
                        )}
                    </IconButton>
                </Box> */}
            </BasePaper>
            <Box p={1} bgcolor={theme.palette.background.default} />

            <BasePaper
                title="質詢"
                subtitle="立法委員要針對行政院的施政進行監督詢答"
            >
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
            </BasePaper>
            <Box p={1} bgcolor={theme.palette.background.default} />

            <BasePaper
                title="立法院出席率"
                subtitle="立委應於指定開會時間出席立法院開會、質詢、審議法案"
            >
                <BigNum
                    num={Number(getPercentage(statistic.sittingRate))}
                    unit="%"
                    text1={`立委平均 ${getPercentage(overallStatistic.overallSittingRate)}%`}
                    text2={`中位數 ${getPercentage(overallStatistic.mediumSittingRate)}%`}
                />
            </BasePaper>
            <Box p={1} bgcolor={theme.palette.background.default} />

            {/* <BasePaper title="政治獻金紀錄" subtitle="每年收到的捐款和使用方式">
                <Box marginBottom="20px">
                    <Typography variant="h4">2016 立委選舉</Typography>
                </Box>
                <Typography variant="h3">{name} 收入</Typography>
                <AppPieChart data={contributionIncome} text={getTenThousand(statistic.contribution.totalIncome) + "萬元"} />
                <Typography variant="h3">{name} 支出</Typography>
                // <AppPieChart data={data01} text={getTenThousand(statistic.contribution.totalExpense) + "萬元"} />
                <Box display="flex" justifyContent="center">
                    <Typography variant="h3" color="primary">{getTenThousand(statistic.contribution.totalExpense) + "萬元"}</Typography>
                </Box>
            </BasePaper> */}
            <Box p={1} bgcolor={theme.palette.background.default} />

            <BasePaper title="同選區其他候選人收支" subtitle={`2016 區域立委選舉 ` + constituency}>
                <CompareBarChart name={name} data={statistic.otherConstituencyCandidate} />
                <span>
                    {`資料來源: `}
                    <Link href="https://sunshine.cy.gov.tw/">
                    監察院 陽光法令主題網
                    </Link>
                </span>
            </BasePaper>
        </Box>
    );
};

export default PositionTab;
