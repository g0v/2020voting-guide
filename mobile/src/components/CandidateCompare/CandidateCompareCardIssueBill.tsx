import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import groupBy from 'lodash/groupBy';
import omit from 'lodash/omit';
import take from 'lodash/take';
import React, { ReactNode } from 'react';
import useFetch from '../../hooks/useFetch';
import { pipe } from '../../utils';
import Alert from '../Alert';
import { Bill } from '../IssueBill';


interface Props {
    name: string;
    constituency: string;
}
interface CandidateFB {
    name: string;
    fbPage: string;
}
interface CandidateCompareIssueProp {
    list: Bill[];
    type: 'person' | 'party';
}
type KeyValue = { [key: string]: Bill[] };

const areCandidateCompareIssueEquals = (
    prevProps: CandidateCompareIssueProp,
    nextProps: CandidateCompareIssueProp
) => {
    return prevProps.list.length === nextProps.list.length;
};

const CandidateCompareIssue = ({ list, type }: CandidateCompareIssueProp) => {
    if (list.length === 0) {
        return null;
    }
    const issueCategories: ReactNode = pipe(
        list,
        (_: Bill[]) => groupBy(_, 'category'),
        (_: KeyValue) => omit(_, ['其他']),
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
            <span>所屬黨團提案 {list.length} 項包含：</span>
        );
    return (
        <div className="candidate-compare-issue-bill-list">
            {label}
            {issueCategories}
        </div>
    );
};

const CandidateCompareIssueMemo = React.memo(
    CandidateCompareIssue,
    areCandidateCompareIssueEquals
);

export default function CandidateCompareCardIssueBill({
    name,
    constituency
}: Props) {
    const { isLoading, responseData } = useFetch<Bill[] | null>(
        `/api/bills/${constituency}/${name}`,
        [],
        [name]
    );

    let child = null;
    if (!isLoading) {
        if (Array.isArray(responseData)) {
            // TypeScript Cannot find name 'Dictionary, I don't have any idea to fix it.'

            const groupObj: any = groupBy<Bill>(responseData, 'proposerType');
            const personIssues: Bill[] = groupObj['立委提案'] || [];
            const partyIssues: Bill[] = groupObj['黨團提案'] || [];
            const candidateUrl = `/candidate/${constituency}/${name}`;
            child = (
                <>
                    <Typography variant="h5">
                        <CandidateCompareIssueMemo
                            list={personIssues}
                            type="person"
                        />
                        <CandidateCompareIssueMemo
                            list={partyIssues}
                            type="party"
                        />
                    </Typography>
                    <div className="mt-auto">
                        <a href={candidateUrl} className="btn btn-rounded">
                            詳細議題法案
                        </a>
                    </div>
                </>
            );
        } else {
            // 沒資料
            child = (
                <div className="candidate-compare-noinfo">
                    <Alert>
                        <Typography variant="h4" className="mb-2">
                            沒有提案資料
                        </Typography>
                        <Typography variant="h5">
                            可能是新立委挑戰者或是沒有提案過
                        </Typography>
                    </Alert>
                </div>
            );
        }
    }
    const elClass = clsx(
        'candidate-compare-col candidate-compare-issue-bill loading style-flex',
        {
            'is-show': isLoading
        }
    );

    return (
        <div className={elClass}>
            <Typography variant="h4" className="candidate-compare-col-title">
                提案
            </Typography>
            {child}
        </div>
    );
}
