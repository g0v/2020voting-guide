import React from 'react';
import partyPolitics from '../../data/party_politics_2020_cec.json';
interface Props {
    name: string;
}
export default function PartiesComparePolitics({ name }: Props) {
    const partyPolity: any = partyPolitics.find(item => {
        return item.name === name;
    });
    return (
        <div className="parties-compare-politics">
            <div className="h4 mb-3">政見</div>
            {partyPolity && (
                <div className="h5 color-gray text-overflow-5">
                    {partyPolity.politics}
                </div>
            )}
            <div>
                <a
                    href={`/party/${name}/基本資料`}
                    className="btn btn-rounded parties-compare-link-btn"
                >
                    完整政見
                </a>
            </div>
        </div>
    );
}
