import React, { ReactNode } from 'react';
import clsx from 'clsx';
import groupBy from 'lodash/groupBy';
import take from 'lodash/take';
import omit from 'lodash/omit';

import useFetch from '../../hooks/useFetch';
import CandidateCompareNoInfo from '../CandidateCompare/CandidateCompareNoInfo';

import { Bill } from '../IssueBill';
import { pipe } from '../../utils';

type KeyValue = { [key: string]: Bill[] };

interface PartiesCompareBillsItemProps {
    list: Bill[];
    type: 'person' | 'party';
}

const PartiesCompareBillsItem = ({
    list,
    type
}: PartiesCompareBillsItemProps) => {
    if (list.length === 0) {
        return null;
    }
    const issueCategories: ReactNode = pipe(
        list,
        (_: Bill[]) => groupBy(_, 'category'),
        // (_: KeyValue) => omit(_, ['其他']),
        (_: KeyValue) => {
            const sortList: string[] = Object.keys(_);
            sortList.sort((a: string, b: string) => _[b].length - _[a].length);
            return sortList.map((key: string) => {
                return (
                    <div key={key}>
                        {key} {_[key].length} 項
                    </div>
                );
            });
        },
        (_: any) => take(_, 3)
    );
    const label =
        type === 'person' ? (
            <span>{list.length} 項提案包含：</span>
        ) : (
            <span>黨團提案 {list.length} 項包含：</span>
        );
    return (
        <div className="h5 color-gray">
            {label}
            {issueCategories}
        </div>
    );
};

interface Props {
    name: string;
}
export default function PartiesCompareBills({ name }: Props) {
    const { isLoading, responseData } = useFetch<Bill[]>(
        `/api/party/${name}`,
        [],
        [name],
        (res: any) => res.bills || []
    );
    let child = null;

    if (!isLoading) {
        const groupObj: any = groupBy<Bill>(responseData, 'proposerType');
        const personIssues: Bill[] = groupObj['立委提案'] || [];
        const partyIssues: Bill[] = groupObj['黨團提案'] || [];
        child = (
            <div className="parties-compare-bills-item">
                <div className="h4 mb-3">黨團提案</div>
                <div className="parties-compare-bills-item">
                    {partyIssues.length === 0 ? (
                        <CandidateCompareNoInfo
                            title="沒有提案資料"
                            content="可能是新競選政黨或是沒有提案過"
                        />
                    ) : (
                        <PartiesCompareBillsItem
                            list={partyIssues}
                            type="party"
                        />
                    )}
                </div>
                <div className="mb-3"></div>
                <div className="h4 mb-3">不分區立委提案</div>
                <div className="parties-compare-bills-item">
                    {personIssues.length === 0 ? (
                        <CandidateCompareNoInfo
                            title="沒有連署資料"
                            content="可能是新競選政黨或是沒有連署過"
                        />
                    ) : (
                        <PartiesCompareBillsItem
                            list={personIssues}
                            type="person"
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            className={clsx('parties-compare-bills loading style-flex', {
                'is-show': isLoading
            })}
        >
            {child}
            <div>
                <a
                    href={`/party/${name}/議題法案`}
                    className="btn btn-rounded parties-compare-link-btn"
                >
                    詳細議題法案
                </a>
            </div>
        </div>
    );
}
