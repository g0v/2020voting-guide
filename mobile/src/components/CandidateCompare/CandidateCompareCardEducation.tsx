import React from 'react';
import regionalAll from '../../data/cec_regional_all.json';
import find from 'lodash/find';
interface Props {
    name: string;
    constituency: string;
}
export default function CandidateCompareCardEducation({
    name,
    constituency
}: Props) {
    const [education, experience] = React.useMemo(() => {
        const candidateData = find(regionalAll, { name }) as any;
        return [
            {
                __html: candidateData.education.replace(/\n/g, '<br/>')
            },
            {
                __html: candidateData.experience.replace(/\n/g, '<br/>')
            }
        ];
    }, []);

    return (
        <div className="candidate-compare-col candidate-compare-education loading style-flex">
            <div className="h4 mb-2">學歷</div>
            <div
                className="h5 text-overflow-5 color-gray"
                dangerouslySetInnerHTML={education}
            ></div>
            <div className="mb-3"></div>
            <div className="h4 mb-2">經歷</div>
            <div
                className="h5 text-overflow-5 color-gray"
                dangerouslySetInnerHTML={experience}
            ></div>
            <div className="mt-auto">
                <a
                    className="btn btn-rounded"
                    href={`/candidate/${constituency}/${name}?tab=3`}
                >
                    詳細學經歷
                </a>
            </div>
        </div>
    );
}
