import React from 'react';
import { Typography } from '@material-ui/core';
import get from 'lodash/get';
import useFetch from '../../hooks/useFetch';
import CandidateCompareNoInfo from './CandidateCompareNoInfo';
import { AdCardProp } from '../Candidate/AdCard';
import { numberWithCommas } from '../../utils';

interface Props {
    name: string;
    constituency: string;
}
interface CandidateFB {
    name: string;
    fbPage: string;
}
export default function CandidateCompareCardFBAd({
    name,
    constituency
}: Props) {
    const { isLoading, responseData } = useFetch<AdCardProp[]>(
        `/api/data/ad/${constituency}/${name}.json`,
        [],
        [name]
    );

    let child = null;
    if (!isLoading) {
        if (responseData.length === 0) {
            child = (
                <CandidateCompareNoInfo
                    title="沒有粉專廣告資料"
                    content="選前大補帖目前沒有找到此候選人的粉絲政治廣告資料"
                />
            );
        } else {
            // [花費lower, 花費upper, 曝光lower, 曝光upper]
            const [
                totalSpendLower,
                totalSpendUpper,
                totalImpressionsLower,
                totalImpressionsUpper
            ] = responseData.reduce(
                (prev: number[], curr: AdCardProp) => {
                    // eslint-disable-next-line
                    let lowerBound: number =
                        get(curr, '廣告詳情.spend.lower_bound', 0) / 1;
                    // eslint-disable-next-line
                    let upperBound: number =
                        get(curr, '廣告詳情.spend.upper_bound', 0) / 1;
                    prev[0] += lowerBound;
                    prev[1] += upperBound;

                    // eslint-disable-next-line
                    lowerBound =
                        get(curr, '廣告詳情.impressions.lower_bound', 0) / 1;
                    // eslint-disable-next-line
                    upperBound =
                        get(curr, '廣告詳情.impressions.upper_bound', 0) / 1;
                    prev[2] += lowerBound;
                    prev[3] += upperBound;

                    return prev;
                },
                [0, 0, 0, 0]
            );
            // 平均花費
            const averageSpend: string = numberWithCommas(
                ((totalSpendLower + totalSpendUpper) / responseData.length) | 0
            );
            // 平均曝光
            const averageImpressions: string = numberWithCommas(
                ((totalImpressionsLower + totalImpressionsUpper) /
                    responseData.length) |
                    0
            );
            child = (
                <>
                    <Typography variant="h4" className="mb-2">
                        粉專廣告貼文
                    </Typography>
                    <Typography variant="h5">
                        {name}共有 {responseData.length} 則付費貼文
                    </Typography>
                    <Typography variant="h5" className="my-3">
                        一則貼文平均
                    </Typography>
                    <Typography
                        variant="h5"
                        className="d-flex align-items-center color-yellow"
                    >
                        <span className="ic-spend"></span>
                        花費 {averageSpend}
                    </Typography>
                    <Typography
                        variant="h5"
                        className="d-flex align-items-center"
                    >
                        <span className="ic-impressions"></span>
                        曝光 {averageImpressions}
                    </Typography>
                    <Typography variant="h5" className="my-3">
                        競選期間共花費
                    </Typography>
                    <Typography
                        variant="h5"
                        className="d-flex align-items-center color-yellow"
                    >
                        <span className="ic-spend"></span>
                        花費 {numberWithCommas(totalSpendLower)} ~{' '}
                        {numberWithCommas(totalSpendUpper)}
                    </Typography>
                    <Typography
                        variant="h5"
                        className="d-flex align-items-center"
                    >
                        <span className="ic-impressions"></span>
                        曝光 {numberWithCommas(totalImpressionsLower)} ~{' '}
                        {numberWithCommas(totalImpressionsUpper)}
                    </Typography>

                    <a
                        href={`/candidate/${constituency}/${name}?tab=1`}
                        className="btn btn-rounded btn-link"
                    >
                        詳細粉專廣告
                    </a>
                </>
            );
        }
    }

    return (
        <div className="candidate-compare-col candidate-compare-fbad style-flex">
            {child}
        </div>
    );
}
