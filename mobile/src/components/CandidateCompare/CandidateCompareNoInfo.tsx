import React from 'react';
import Alert from '../Alert';

interface Props {
    title?: string;
    content?: string;
}

export default function CandidateCompareNoInfo(props: Props) {
    const { title = '', content = '' } = props;
    return (
        <div className="candidate-compare-noinfo">
            <Alert className="p-0">
                <div className="h4 mb-2 color-black font-weight-500">
                    {title}
                </div>
                <div className="h5">{content}</div>
            </Alert>
        </div>
    );
}
