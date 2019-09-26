import React from 'react';
import Bulletin from '../Bulletin';

// interface IssueBillTab {
//     issueBills: IssueBillProps[];
// }

// const IssueBillTab = ({ issueBills }: IssueBillTab) => {
const IssueBillTab = () => {
    return (
        <>
            <Bulletin
                primary="對於民眾關注的熱門議題，候選人在立法院實際提案和連署的法案。"
                secondary="這些議題怎麽產生的？"
            />
        </>
    );
};

export default IssueBillTab;
