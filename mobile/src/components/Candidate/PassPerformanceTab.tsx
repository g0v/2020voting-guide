import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ReferenceLine,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    {
        name: '脫黨表決',
        百分比: 0.69,
        pv: 8,
        fill: '#82ca9d'
    },
    {
        name: '投票表決',
        百分比: 59.4,
        pv: '689/1160',
        fill: '#83a6ed'
    },
    {
        name: '院會出席',
        百分比: 99,
        pv: '303/304',
        fill: '#8884d8'
    }
];

const PositionTab = () => {
    return (
        <>
            <div>擔任立委表現</div>
            <hr />
            <div>總覽</div>
            <div>
                <span>所有立委平均 </span>
                <span>所以立委中位數 </span>
                <ResponsiveContainer aspect={4.0 / 3.0} width="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={value => value + '%'} />
                        <ReferenceLine
                            x={76}
                            label="abc"
                            stroke="red"
                            strokeDasharray="3 3"
                        />
                        <Bar dataKey="百分比" />
                        <ReferenceLine
                            x={56}
                            label="ccc"
                            stroke="red"
                            strokeDasharray="3 3"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default PositionTab;
