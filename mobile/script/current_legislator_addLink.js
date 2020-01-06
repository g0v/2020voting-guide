//
//  usage:
//  $ cd mobile $ node script/current_legislator_addLink.js
//
//

var fs = require('fs');

function addLink() {
    let original = _readFile('./output.json'); // output json file from current_legislator_countValue.js
    let regional = _readFile('../../data/static/regional_candiates.json');

    for (const property in original) {
        if (original.hasOwnProperty(property)) {
            for (let i = 0; i < original[property].length; i++) {
                for (let j = 0; j < regional.length; j++) {
                    if (original[property][i].name == regional[j].name) {
                        original[property][i].link = `/candidate/${regional[j].constituency}/${regional[j].name}`;
                    } 
                    else if (
                        !original[property][i].link &&
                        j == regional.length -1 && 
                        original[property][i].name !== regional[j].name
                        ) {
                        original[property][i].link = `/party/${original[property][i].constituency}/candidate/${original[property][i].name}`;
                    }
                }
            }
        }
    }
    
    const result = JSON.stringify(original);
    _writeFile(result);
};

function _readFile(path) {
    let getData = () => fs.readFileSync(path, { endoding: 'utf8'});
    let result = JSON.parse(getData());
    return result;
}

function _writeFile(result) {
    fs.writeFile('./output.json', result, function (err) {
        if (err) { return console.error(err); }
        console.log('success!!');
    })
}


addLink();