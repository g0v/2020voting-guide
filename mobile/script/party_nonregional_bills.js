const fs = require('fs');

// bill.json is query from table `bill`
// `SELECT * FROM vote2020.bill`
const bill = require('./bill.json');

const partyCandidates = {
    親民黨: ['李鴻鈞', '陳怡潔', '周陳秀霞'],
    時代力量: ['高潞．以用．巴魕剌', '徐永明'],
    中國國民黨: [
        '王金平',
        '柯志恩',
        '陳宜民',
        '林麗蟬',
        '許毓仁',
        '曾銘宗',
        '黃昭順',
        '吳志揚',
        '張麗善',
        '徐榛蔚',
        '曾永權'
    ],
    民主進步黨: [
        '吳焜裕',
        '吳玉琴',
        '陳曼麗',
        '顧立雄',
        '蔡培慧',
        '王榮璋',
        'Kolas Yotaka',
        '余宛如',
        '蘇嘉全',
        '段宜康',
        '鄭麗君',
        '陳其邁',
        '尤美女',
        '李應元',
        '鍾孔炤',
        '林靜儀',
        '徐國勇',
        '施義芳'
    ]
}(function() {
    const bills = bill.bill;
    const data = {};
    Object.keys(partyCandidates).forEach(party => {
        const candidates = partyCandidates[party];
        bills.forEach(bill => {
            let isAdd = false;
            candidates.forEach(c => {
                if (isAdd) {
                    return;
                }

                if (bill.billProposer && bill.billProposer.includes(c)) {
                    if (!data[party]) {
                        data[party] = [];
                    }

                    data[party].push({
                        ...bill,
                        proposerType: '不分區立委提案'
                    });
                    isAdd = true;
                }
            });
        });
    });

    fs.writeFileSync('party_nonregional_bills.json', JSON.stringify(data));
})();
