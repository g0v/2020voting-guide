//
//  usage:
//  $ cd mobile $ node script/current_legislator_issue.js
//
//
var fs = require('fs');
var path = ''; 

// combine the proposal and interpellation
function countValue() {
    fs.readFile('path', function (err, data) {
        if (err) {
            return console.err(err);
        };
        
        var newData = data.toString();
        newData = JSON.parse(newData);

        for (const property in newData) {
            newData[property] = _flat(_setFormat(newData[property]));
            console.log(property);
        }

        var result = JSON.stringify(newData);
        fs.writeFile('./output.json', result, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('success!!');
            
        })
    })
};

function _setFormat(data) {
    const result = Object.keys(data).map(function (key) {
        return {
            name: key,
            children: _comblineValue(data[key])
        }
    });
    return result;
}

function _comblineValue(data) {
    let acc = [];
    let result = [];

    for (let i = 0; i < data.length; i++) {
        const findIndex = acc.findIndex( name => name == data[i].name);

        if (findIndex == -1) {
            acc.push(data[i].name);
            result.push({
                name: data[i].name,
                constituency: data[i].constituency,
                value: isNaN(data[i].proposal) ? data[i].interpellation :  data[i].proposal
            })
        } else {
            result[findIndex].value = isNaN(data[i].proposal) ? 
                result[findIndex].value + data[i].interpellation :
                result[findIndex].value + data[i].proposall;
                ;
        }
    }
    return result;
}

function _flat(data) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].children.length; j++) {
            result.push(data[i].children[j]);
        }
    }
    return result;
}

countValue();