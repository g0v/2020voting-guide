import React from 'react';
import Bulletin from '../Bulletin';

const bulletin = '無私搖 擔任 第九屆立法委員 2016-2020';

const PositionTab = () => {
    return (
        <>
            <Bulletin primary={bulletin} />
            <div>擔任立委表現</div>
            <hr />
            <div>總覽</div>
            <div>
                <span>所有立委平均 </span>
                <span>所以立委中位數 </span>
            </div>
        </>
    );
};

export default PositionTab;
