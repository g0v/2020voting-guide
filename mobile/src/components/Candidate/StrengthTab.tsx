import { Box, Link, Typography } from '@material-ui/core';
import React from 'react';
import Alert from '../Alert';
import AdCard from './AdCard';
import CompareBarChart from './CompareBarChart';
import ContributionChart from './ContributionChart';

const candidateFBDefault = {
    name: '',
    fbPage: ''
};

interface AD {
    開始日期: string;
    結束日期: string;
    圖片: string;
    廣告內容: string;
    廣告詳情: {
        ad_creative_body: string;
        ad_creation_time: string;
        ad_creative_link_caption: string;
        ad_creative_link_description: string;
        ad_creative_link_title: string;
        ad_delivery_start_time: string;
        ad_delivery_stop_time: string;
        currency: string;
        demographic_distribution: string;
        impressions: {
            lower_bound: string;
            upper_bound: string;
        };
        spend: {
            lower_bound: string;
            upper_bound: string;
        };
    };
}

const Payment: {
    candidate: {
        finance_data: {
            income: { items: []; total: number };
            outcome: { items: []; total: number };
        };
    };
    constituency: {
        candidates: [];
    };
} = {
    candidate: {
        finance_data: {
            income: { items: [], total: 0 },
            outcome: { items: [], total: 0 }
        }
    },
    constituency: {
        candidates: []
    }
};

const StrengthTab = ({
    constituency,
    name,
    padding
}: {
    constituency: string;
    name: string;
    padding?: object;
}) => {
    const width = window.screen.width > 425 ? 425 : window.screen.width;

    const [candidateFB, setCandidateFB] = React.useState(candidateFBDefault);
    React.useEffect(() => {
        fetch(`/api/fb/${constituency}/${name}`)
            .then(res => res.json())
            .then(setCandidateFB);
    }, [name, constituency]);

    const [ads, setAds] = React.useState([]);
    React.useEffect(() => {
        fetch(`/api/data/ad/${constituency}/${name}.json`)
            .then(res => res.json())
            .then(setAds);
    }, [name, constituency]);

    const [payment, setPayment] = React.useState(Payment);
    const [hasPayment, setHasPayment] = React.useState(false);

    const {
        candidate: {
            finance_data: { income, outcome }
        },
        constituency: { candidates: othercandidates }
    } = payment;

    const incomeDetail = income.items.map(
        (item: { name: string; amount: number; item_count: number }) => {
            return {
                ...item,
                value: item.amount,
                percent:
                    Number(((item.amount / income.total) * 100).toFixed(2)) || 0
            };
        }
    );

    const outcomeDetail = outcome.items.map(
        (item: { name: string; amount: number; item_count: number }) => {
            return {
                name: item.name,
                value: item.amount,
                percent:
                    Number(((item.amount / outcome.total) * 100).toFixed(2)) ||
                    0
            };
        }
    );

    const otherCandidates = othercandidates.map(
        (candidate: {
            name: string;
            finance: {
                income: {
                    total: number;
                };
                outcome: {
                    total: number;
                };
            };
        }) => {
            return {
                name: candidate.name,
                totalIncome: candidate.finance
                    ? candidate.finance.income.total
                    : 0,
                totalExpense: candidate.finance
                    ? candidate.finance.outcome.total
                    : 0
            };
        }
    );

    const totalIncome = income.total;
    const totalOutcome = outcome.total;

    React.useEffect(() => {
        fetch(`/api/data/2016_payment/${name}.json`)
            .then(res => res.json())
            .then(res => {
                if (res) {
                    setHasPayment(true);
                }
                setPayment(res);
            })
            .catch(err => console.log(err));
    }, [name]);

    return (
        <>
            <Box bgcolor="#F9F9F9" py={1} style={padding}>
                <Alert>
                    <Typography variant="h5" color="textSecondary">
                        以下是此候選人在競選期間的收支狀況與宣傳手法。
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                        {'資料來源: '}
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
                        title="fan page"
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

            {hasPayment && (
                <Box bgcolor="#F9F9F9" py={1} style={padding}>
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
                            <Typography variant="h3">
                                {name}政治獻金專戶
                            </Typography>
                        </Box>
                        <ContributionChart
                            totalIncome={totalIncome}
                            totalExpense={totalOutcome}
                            income={incomeDetail}
                            expense={outcomeDetail}
                        />
                        <Box my={2}>
                            <Typography variant="h5" color="textSecondary">
                                {`政治獻金細目：`}
                                <Link href="https://g0v-money-flow.github.io/">
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
                            2016 區域立委選舉 {constituency} 其他候選人收支
                        </Typography>
                        <CompareBarChart name={name} data={otherCandidates} />
                        <Box my={2}>
                            <Typography variant="h5" color="textSecondary">
                                {`資料來源：`}
                                <Link href="https://g0v-money-flow.github.io/">
                                    公民監督國會聯盟-金流百科
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default StrengthTab;
