import React from 'react';
import Bulletin from '../Bulletin';

const data = [
    {
        title: '一國兩制',
        category: '公開言論',
        attitude: true,
        content:
            '憲法第11條明文規定人民有言論講學及著作出版自由，要落實言論與出版自由，必須要有新聞自由做為基礎；另外，NCC組織法第1條也明文規定，為落實人民言論自由要給媒體自主經營空間，而言論自由、新聞自由是自由民主國家最重要的基礎，黃國昌過去是法律學者、現在是立委，他一定很清楚這些法律規範和民主國家的立國精神。 ( 中國時報 2019/06/23 )',
        link:
            'https://www.chinatimes.com/realtimenews/20190622002415-260407?chdtv'
    }
];

interface Position {
    title: string;
    category: string;
    attitude: boolean;
    content: string;
    link: string;
}

const PositionCard: React.FunctionComponent<Position> = ({
    title,
    category,
    attitude,
    content,
    link
}) => {
    return (
        <>
            <div>{title}</div>
            <div>
                {category} {attitude}
            </div>
            <div>{content}</div>
        </>
    );
};

const PositionTab = () => {
    return (
        <>
            <Bulletin />
            <div>擔任立委表現</div>
            <hr />
            <div>總覽</div>
            <div>
                {data.map(position => (
                    <PositionCard
                        title={position.title}
                        category={position.category}
                        attitude={position.attitude}
                        content={position.content}
                        link={position.link}
                    />
                ))}
            </div>
        </>
    );
};

export default PositionTab;
