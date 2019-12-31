import { Box, Link, Typography } from '@material-ui/core';
import React from 'react';
import Alert from '../Alert';
import AdCard, { AdCardProp } from './AdCard';
import CompareBarChart from './CompareBarChart';
import ContributionChart from './ContributionChart';
import Card from '../Card';
import { caculateCurrencySum, caculateImpressionsSum } from './adCaculation';

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
    fbPage,
    padding
}: {
    constituency: string;
    name: string;
    fbPage: string;
    padding?: object;
}) => {
    const width = window.screen.width > 425 ? 425 : window.screen.width;

    const [ads, setAds] = React.useState<AdCardProp[]>([]);
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
            isElected: boolean;
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
                isElected: candidate.isElected,
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
        if (!name) return;
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

    const {
        sumLower: impressionSumLower,
        sumUpper: impressionSumUpper
    } = caculateImpressionsSum(ads);
    const impressonSumWording = `${(impressionSumLower / 10000).toFixed(
        0
    )} ~ ${(impressionSumUpper / 10000).toFixed(0)} 萬次`;
    const impressonAvgWording = `${(
        impressionSumLower /
        10000 /
        ads.length
    ).toFixed(2)} ~ ${(impressionSumUpper / 10000 / ads.length).toFixed(
        2
    )} 萬次`;

    const {
        sumLower: currencySumLower,
        sumUpper: currencySumUpper
    } = caculateCurrencySum(ads);
    const currencySumWording = `${(currencySumLower / 10000).toFixed(0)} ~ ${(
        currencySumUpper / 10000
    ).toFixed(0)} 萬元`;
    const currencyAvgWording = `${(
        currencySumLower /
        10000 /
        ads.length
    ).toFixed(2)} ~ ${(currencySumUpper / 10000 / ads.length).toFixed(2)} 萬元`;

    return (
        <>
            <Box bgcolor="#F9F9F9" py={1} style={padding}>
                <Alert>
                    <Typography variant="h5" color="textSecondary">
                        以下是此候選人在競選期間的收支狀況與宣傳手法
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                        {'資料來源: '}
                        <Link href="https://www.facebook.com/ads/library">
                            <u>Facebook Ad Library</u>
                        </Link>
                    </Typography>
                </Alert>
                <Box
                    display="flex"
                    alignItems="center"
                    mx={1.5}
                    pt={3}
                    pb={1.5}
                >
                    <Box
                        width="8px"
                        height="24px"
                        mr={1}
                        borderRadius="4px"
                        bgcolor="primary.main"
                    />
                    <Typography variant="h2">FB 粉專廣告投放</Typography>
                </Box>
                {fbPage.length ? (
                    <>
                        <Box textAlign="center" maxHeight={130}>
                            <iframe
                                src={
                                    'https://www.facebook.com/plugins/page.php?' +
                                    `href=${fbPage}` +
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
                        <Alert>
                            <Typography variant="h5" color="textSecondary">
                                本次選舉臉書要求政治相關廣告須登記並記錄金額流量
                            </Typography>
                            <Typography variant="h5" color="textSecondary">
                                {'詳細說明: '}
                                <Link href="https://www.facebook.com/business/help/208949576550051">
                                    <u>臉書政治廣告政策連結</u>
                                </Link>
                            </Typography>
                        </Alert>
                    </>
                ) : (
                    <Box bgcolor="#F9F9F9" textAlign="center" pb={3}>
                        <img
                            width="150"
                            height="150"
                            src="/img/doll/empty_fanpage.svg"
                            alt="沒有粉絲專頁"
                        />
                        <Box height={14} />
                        <Typography variant="h4" gutterBottom>
                            沒有粉專資料
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                            選前大補帖目前沒有找到此候選人的粉絲專頁
                        </Typography>
                    </Box>
                )}

                <Box px={1} pb={1}>
                    {ads.length ? (
                        <Card>
                            <Typography
                                variant="h5"
                                color="textSecondary"
                                gutterBottom
                            >
                                {name}的粉專共投放了{ads.length}篇政治廣告貼文
                            </Typography>
                            <Box my={2}>
                                <Typography
                                    variant="h4"
                                    color="textPrimary"
                                    gutterBottom
                                >
                                    一則貼文平均
                                </Typography>
                                <Box
                                    display="flex"
                                    alignContent="center"
                                    color="#D4AF37"
                                >
                                    <Box width={42} textAlign="center">
                                        <img alt="花費" src="/img/money.svg" />
                                    </Box>
                                    <Box width={4} />
                                    <Typography variant="h4">
                                        {`花費 ${currencyAvgWording}`}
                                    </Typography>
                                </Box>
                                <Box height={5} />
                                <Box display="flex" alignContent="center">
                                    <Box width={42} textAlign="center">
                                        <img alt="曝光" src="/img/eye.svg" />
                                    </Box>
                                    <Box width={4} />
                                    <Typography
                                        variant="h4"
                                        color="textSecondary"
                                    >
                                        {`曝光 ${impressonAvgWording}`}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box my={2}>
                                <Typography
                                    variant="h4"
                                    color="textPrimary"
                                    gutterBottom
                                >
                                    競選期間共花費
                                </Typography>
                                <Box
                                    display="flex"
                                    alignContent="center"
                                    color="#D4AF37"
                                >
                                    <Box width={42} textAlign="center">
                                        <img alt="花費" src="/img/money.svg" />
                                    </Box>
                                    <Box width={4} />
                                    <Typography variant="h4">
                                        {`花費 ${currencySumWording}`}
                                    </Typography>
                                </Box>
                                <Box height={5} />
                                <Box display="flex" alignContent="center">
                                    <Box width={42} textAlign="center">
                                        <img alt="曝光" src="/img/eye.svg" />
                                    </Box>
                                    <Box width={4} />
                                    <Typography
                                        variant="h4"
                                        color="textSecondary"
                                    >
                                        {`曝光 ${impressonSumWording}`}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    ) : null}
                    {ads.map((ad: AdCardProp) => (
                        <AdCard {...ad} key={ad.AD_ID} />
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
                                {`政治獻金細目： `}
                                <Link href="https://g0v-money-flow.github.io/">
                                    金流百科
                                </Link>
                                {` 田君陽提供`}
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
                                {`資料來源： `}
                                <Link href="https://g0v-money-flow.github.io/">
                                    金流百科
                                </Link>
                                {` 田君陽提供`}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default StrengthTab;
