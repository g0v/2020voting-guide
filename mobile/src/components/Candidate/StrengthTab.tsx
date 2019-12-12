import { Box, Link, Typography } from '@material-ui/core';
import React from 'react';
import Alert from '../Alert';
import AdCard from './AdCard';
import ContributionChart from './ContributionChart';
import CompareBarChart from './CompareBarChart';

const candidateFBDefault = {
    name: '',
    fbPage: ''
};

const contributionMappings: { [key: string]: string } = {
    personalContributeion: '個人捐贈收入',
    profitableContributeion: '營利事業捐贈收入',
    partyContributeion: '政黨捐贈收入',
    civilOrganizationsContributeion: '人民團體捐贈收入',
    anonymousContributeion: '匿名捐贈收入',
    otherContributeion: '其他收入'
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

interface AD {
    開始日期: string;
    結束日期: string;
    圖片: string;
    廣告內容: string;
}

const StrengthTab = ({
    constituency,
    name
}: {
    constituency: string;
    name: string;
}) => {
    const width = window.screen.width > 425 ? 425 : window.screen.width;

    const [candidateFB, setCandidateFB] = React.useState(candidateFBDefault);
    React.useEffect(() => {
        fetch(`/api/fb/${constituency}/${name}`)
            .then(res => res.json())
            .then(setCandidateFB);
    }, [name]);

    const [ads, setAds] = React.useState([]);
    React.useEffect(() => {
        fetch(`/api/data/ad/${constituency}/${name}.json`)
            .then(res => res.json())
            .then(setAds);
    }, [name]);

    const [statistic, setStatistic] = React.useState(Statistic);
    const contributionIncome = Object.keys(contributionMappings).map((key: string) => {
        return {
            name: contributionMappings[key] || '',
            value: statistic.contribution[key],
            percent: Number(((statistic.contribution[key] / statistic.contribution.totalIncome) * 100).toFixed(2)) || 0
        }
    }).sort((a, b) => {
        return b.value - a.value
    })

    const contributionExpense = [
            {
            name: '總支出',
            value: statistic.contribution.totalExpense,
            percent: 100
        }
    ]

    React.useEffect(() => {
        if (!name) return;
        fetch(`/api/statistic/${name}`)
            .then(res => res.json())
            .then(res => setStatistic(res));
    }, [name]);

    return (
        <>
            <Box bgcolor="#F9F9F9" py={1}>
                <Alert>
                    <Typography variant="h5" color="textSecondary">
                        以下是此候選人在競選期間的收支狀況與宣傳手法。
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                        {"資料來源: "}
                        <Link href="https://www.facebook.com/ads/library">
                            <u>Facebook Ad Library</u>
                        </Link>
                    </Typography>
                </Alert>
                <Box display="flex" alignItems="center" mx={1.5} pt={3}>
                    <Box
                        width="8px"
                        height="24px"
                        mr={1}
                        borderRadius="4px"
                        bgcolor="primary.main"
                    />
                    <Typography variant="h2">FB 粉專廣告投放</Typography>
                </Box>
                <Box display="flex" mb={3} mt={1}>
                    <Box ml={3.5} />
                    <Typography variant="h5" color="textSecondary">
                        候選人在臉書粉絲團上的花費及廣告內容
                    </Typography>
                </Box>
                <Box textAlign="center" maxHeight={130}>
                    <iframe
                        src={
                            'https://www.facebook.com/plugins/page.php?' +
                            `href=${candidateFB.fbPage}` +
                            `&width=${width}&adapt_container_width=true` +
                            '&show_facepile=false&hide_cta=true'
                        }
                        width={width}
                        scrolling="no"
                        frameBorder="0"
                        allow="encrypted-media"
                    />
                </Box>
                <Box px={1} pb={1}>
                    {ads.map((ad: AD) => (
                        <AdCard {...ad} />
                    ))}
                </Box>
            </Box>

            <Box bgcolor="#F9F9F9" py={1}>
                <Box display="flex" alignItems="center" mx={1.5} pt={3}>
                    <Box
                        width="8px"
                        height="24px"
                        mr={1}
                        borderRadius="4px"
                        bgcolor="primary.main"
                    />
                    <Typography variant="h2">上次競選經費</Typography>
                </Box>
                <Box display="flex" mb={3} mt={1}>
                    <Box ml={3.5} />
                    <Typography variant="h5" color="textSecondary">
                        候選人在上屆立委選舉收到的捐款和使用方式
                    </Typography>
                </Box>
                <Box bgcolor="#FFFFFF" p={2}>
                    <Typography variant="h4">2016 立委選舉</Typography>
                    <Box my={2}>
                        <Typography variant="h3">{name}政治獻金專戶</Typography>
                    </Box>
                    <ContributionChart
                        totalIncome={statistic.contribution.totalIncome}
                        totalExpense={statistic.contribution.totalExpense}
                        income={contributionIncome}
                        expense={contributionExpense}/>

                    <Box my={2}>
                        <Typography variant="h5" color="textSecondary">
                        {`政治獻金細目：`}
                        <Link href="https://sunshine.cy.gov.tw/">
                        公民監督國會聯盟-金流百科
                        </Link>
                        </Typography>
                    </Box>
                </Box>

                <Box bgcolor="#FFFFFF" p={2}>
                    <Box my={2}>
                        <Typography variant="h3">與其他立委比較</Typography>
                    </Box>
                    <Typography variant="h5" color="textSecondary">
                        2016 區域立委選舉 { constituency } 其他候選人收支
                    </Typography>
                    <CompareBarChart name={name} data={statistic.otherConstituencyCandidate} />
                    <Box my={2}>
                        <Typography variant="h5" color="textSecondary">
                            {`資料來源：`}
                            <Link href="https://sunshine.cy.gov.tw/">
                            監察院 陽光法令主題網
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default StrengthTab;
