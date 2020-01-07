// original source from `https://drive.google.com/file/d/1v9BWQrYcd0N6qiQNQ6ktcj72E9iZYIth/view?usp=sharing`
//
//  Data { [Party]: Candidate[] }
//
//  Candidate {
//    '名單次序': number,
//    '姓名': string,
//    '出生年月日': string,
//    '性別': string,
//    '出生地': string,
//    '學歷': string,
//    '經歷': string,
//  },
//
const data = require('./party_candidates_2016_raw.json');
const fs = require('fs');

function convertBirth(str) {
    const nums = str.split('/');
    return `${1911 + parseInt(nums[0])}-${nums[1]}-${nums[2]}`;
}

function getAge(str) {
    const nums = str.split('/');
    return 2020 - 1911 - parseInt(nums[0]);
}

(() => {
    const newData = {};
    Object.keys(data).forEach(party => {
        data[party].forEach(can => {
            newData[party] = newData[party]
                ? [
                      ...newData[party],
                      {
                          name: can['姓名'],
                          birth: convertBirth(can['出生年月日']),
                          age: getAge(can['出生年月日']),
                          education: can['學歷'],
                          experience: can['經歷']
                      }
                  ]
                : [
                      {
                          name: can['姓名'],
                          birth: convertBirth(can['出生年月日']),
                          age: getAge(can['出生年月日']),
                          education: can['學歷'],
                          experience: can['經歷']
                      }
                  ];
        });
    });
    fs.writeFileSync('party_candidates_2016.json', JSON.stringify(newData));
})();
