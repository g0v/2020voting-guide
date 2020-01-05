import React from 'react';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import find from 'lodash/find';
import useFetch from '../../hooks/useFetch';
import { CandidateType } from '../Candidate/Candidate';
import regionalAll from '../../data/cec_regional_all.json';
interface Props {
    name: string;
    constituency: string;
}
export default function CandidateCompareCardEducation({
    name,
    constituency
}: Props) {
    const politic = React.useMemo(() => {
        const candidateData = find(regionalAll, { name }) as any;
        return {
            __html: candidateData.politic.replace(/\n/g, '<br/>')
        };
    }, []);

    return (
        <div className="candidate-compare-col candidate-compare-political style-flex">
            <div className="h4 mb-2">政見</div>
            <div
                className="h5 text-overflow-7 color-gray"
                dangerouslySetInnerHTML={politic}
            ></div>

            <div className="mt-auto">
                <a
                    className="btn btn-rounded"
                    href={`/candidate/${constituency}/${name}?tab=3`}
                >
                    完整政見
                </a>
            </div>
        </div>
    );
}
