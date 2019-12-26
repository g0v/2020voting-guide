import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
    selectMode: boolean;
    children: ReactNode;
    selectIndex: number;
    onClick: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const CandidateCardWrap = ({
    selectMode,
    children,
    onClick,
    selectIndex
}: Props) => {
    const clazz = clsx('candidate-card-wrap', {
        'style-select': selectMode,
        'style-checked': selectIndex >= 0
    });
    return (
        <div className={clazz} onClick={onClick}>
            <div className="candidate-card-wrap__checkbox transition">
                <span>{selectIndex + 1}</span>
            </div>
            {children}
        </div>
    );
};
export default CandidateCardWrap;
