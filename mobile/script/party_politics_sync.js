//
//  usage:
//  $ cd mobile
//  $ node script/party_politics_sync.js
//  prettier src/data/party_politics_2016.json manually
//
const fs = require('fs');
const csv2json = require('csvjson-csv2json');

(() => {
    sync('2016');
    sync('2020');
})();

function sync(year) {
    const csv = fs.readFileSync(`../data/manual/${year}party_politics.csv`, {
        encoding: 'utf8'
    });

    let data = csv2json(csv, { parseNumbers: true });
    data = data.map(toEnvKey);
    fs.writeFileSync(
        `src/data/party_politics_${year}.json`,
        JSON.stringify(data)
    );
}

function toEnvKey(item) {
    return {
        name: item['政黨'],
        politics: item['政見']
    };
}
