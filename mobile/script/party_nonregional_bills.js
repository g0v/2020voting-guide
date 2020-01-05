const fs = require('fs');
const bill = require('./bill.json');
const lastC = require('./last_candidate.json');

(function() {
    const bills = bill.bill;
    const data = {};
    Object.keys(lastC).forEach(party => {
        const candidates = lastC[party];
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
