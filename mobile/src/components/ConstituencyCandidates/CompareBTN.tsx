import React, { memo } from 'react';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
    selectMode: boolean;
    label: string;
    onClick: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
/**
 * 比較候選人按鈕
 */
const CompareBTN = ({ selectMode, onClick, label }: Props) => {
    const clazz = clsx('btn btn-rounded compare-btn', {
        'btn-cancel': selectMode
    });
    return (
        <div className={clazz} onClick={onClick}>
            {selectMode && <CloseIcon />}
            <span>{selectMode ? '取消' : label}</span>
        </div>
    );
};

export default memo(CompareBTN);
