import find from 'lodash/find';
import React from 'react';
import regionalAll from '../../data/cec_regional_all.json';
interface Props {
    name: string;
    constituency: string;
}
export default function CandidateCompareCardEducation({ name, constituency }: Props) {
    const politic = React.useMemo(() => {
        const candidateData = find(regionalAll, { name, constituency }) as any;
        return {
            __html: candidateData.politic.replace(/\n/g, '<br/>')
        };
    }, [name, constituency]);

    return (
        <div className="candidate-compare-col candidate-compare-political style-flex">
            <div className="h4 mb-2">政見</div>
            <div className="h5 text-overflow-20 color-gray" dangerouslySetInnerHTML={politic}></div>
            <a className="btn btn-rounded btn-link" href={`/candidate/${constituency}/${name}?tab=3`}>
                完整政見
            </a>
        </div>
    );
}
