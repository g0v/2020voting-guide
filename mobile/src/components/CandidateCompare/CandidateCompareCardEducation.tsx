import find from 'lodash/find';
import React from 'react';
import regionalAll from '../../data/cec_regional_all.json';
interface Props {
    name: string;
    constituency: string;
}
export default function CandidateCompareCardEducation({
    name,
    constituency
}: Props) {
    const [education, experience] = React.useMemo(() => {
        const candidateData = find(regionalAll, { name, constituency }) as any;
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
        <div className="candidate-compare-col candidate-compare-education style-flex">
            <div className="candidate-compare-education-item">
                <div className="h4 mb-2">學歷</div>
                <div
                    className="h5 text-overflow-5 color-gray"
                    dangerouslySetInnerHTML={education}
                ></div>
            </div>
            <div className="mb-3"></div>
            <div className="candidate-compare-education-item">
                <div className="h4 mb-2">經歷</div>
                <div
                    className="h5 text-overflow-5 color-gray"
                    dangerouslySetInnerHTML={experience}
                ></div>
            </div>
            <a
                className="btn btn-rounded btn-link"
                href={`/candidate/${constituency}/${name}?tab=3`}
            >
                詳細學經歷
            </a>
        </div>
    );
}
