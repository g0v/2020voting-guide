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
    { name: '個人捐贈', precent: 57.1 },
    { name: '營利事業捐贈', percent: 39.3 },
    { name: '人民團體捐贈', percent: 3 }
];

const contributionMappings: { [key: string]: string } = {
    personalContributeion: '個人捐贈',
    profitableContributeion: '營利事業捐贈',
    partyContributeion: '政黨捐贈',
    civilOrganizationsContributeion: '人民團體捐贈',
    anonymousContributeion: '匿名捐贈',
    otherContributeion: '其他'
}

// const contributionIncome = [
//     { name: 'personalContributeion', value: 10327100 },
//     { name: 'profitableContributeion', value: 7097200 },
//     { name: 'partyContributeion', value: 0 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group E', value: 278 },
//     { name: 'Group F', value: 189 }
// ];


const Statistic = {
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
    }
};
interface PositionTab {
    name?: string;
    lastTerm?: string;
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

const PositionTab = ({
    name = '',
    lastTerm,
    lastTermYear,
    interpellationCategory = []
}: PositionTab) => {
    const theme = useTheme();
    const classes = useStyle();
    const [showMoreInterpellation, setMoreInterpellation] = React.useState(
        false
    );
    const [showMoreBillProposal, setMoreBillProposal] = React.useState(false);
    const [statistic, setStatistic] = React.useState(Statistic);

    console.log(statistic);

    const contributionIncome: {name: string; percent: any} = Object.keys(contributionMappings).map((key: string) => {
        return {
            name: contributionMappings[key] || '',
            percent: (statistic.contribution[key] / statistic.contribution.totalIncome) || 0
        }
    })

    React.useEffect(() => {
        if (!name) return;
        fetch(`/api/statistic/${name}`)
            .then(res => res.json())
            .then(res => setStatistic(res));
    }, [name]);

    return (
        <>
            <Bulletin
                primary={`${name} 曾擔任 ${lastTerm}`}
                secondary={lastTermYear}
            />
            <BasePaper
                title="立法院出席率"
                subtitle="立委應於指定開會時間出席立法院開會、質詢、審議法案"
            >
                <BigNum
                    num={statistic.sittingRate * 100}
                    unit="%"
                    text1=""
                    text2=""
                />
            </BasePaper>
            <Box p={1} bgcolor={theme.palette.background.default} />

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
                <Typography variant="h3">最多主提案修法類別</Typography>
                <AppBarChart
                    data={statistic.billProposal}
                    showMore={showMoreBillProposal}
                />
                <Box display="flex" justifyContent="center">
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
                </Box>
                {/* <Typography variant="h5">
                    立法院： 吳思姚法案主題案影音
                </Typography> */}
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
                {/* <Typography variant="h5">立法院： 吳思姚質詢影音</Typography> */}
            </BasePaper>
            <Box p={1} bgcolor={theme.palette.background.default} />

            <BasePaper title="政治獻金紀錄" subtitle="每年收到的捐款和使用方式">
                <Typography variant="h3">{name} 收入</Typography>
                <AppPieChart data={contributionIncome} text={getTenThousand(statistic.contribution.totalIncome) + "萬元"} />
                <Typography variant="h3">{name} 支出</Typography>
                <AppPieChart data={data01} text={getTenThousand(statistic.contribution.totalExpense) + "萬元"} />
                {/* <Typography variant="h5">
                    立法院： 吳思姚法案主題案影音
                </Typography> */}
            </BasePaper>
            <Box p={1} bgcolor={theme.palette.background.default} />
        </>
    );
};

export default PositionTab;
