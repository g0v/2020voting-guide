# Integrate Personal Info

Intergrate legislator personal info by terms.

## Output

### Raw

```json
{"jsonList": [{
        "sex": "男",
        "picUrl": null,
        "party": "中國國民黨",
        "degree": "台灣大學政治系學士;美國佛萊契爾外交法律研究院(哈佛大學合作管理)國際政治學博士;",
        "partyGroup": "中國國民黨",
        "areaName": "台北市第一選舉區",
        "committee": null,
        "term": "02",
        "leaveReason": null,
        "name": "丁守中",
        "ename": "Ting, Shou-chung",
        "leaveFlag": "否",
        "experience": "立法院國防委員會召集委員、程序委員;財團法人兩岸發展研究基金會董事長;台灣大學政治學研究所副教授;國民黨中央青年工作會副主任;財團法人董氏基金會公益顧問;\n  ;",
        "leaveDate": null,
        "onboardDate": "1993\/02\/01"},...]}
```

### Organized

```json
{
  "郭台銘": {
    "id": "2",
    "name": "郭台銘",
    "detail_list": []
  },
  "韓國瑜": {
    "id": "3",
    "name": "韓國瑜",
    "detail_list": [
      {
        "term": "02",
        "party": "中國國民黨",
        "areaName": "台北縣",
        "onboardDate": "1993/02/01",
        "degree": "板橋國小;海山國中;恆毅中學;東吳大學文學士;政治大學法學碩士;陸軍官校、步校、運輸兵學校;",
        "experience": "台北縣議員;世界新聞學院講師;文化大學推廣中心主任;花蓮師院講師;《中國時報》撰述委員;73年、75年全國大專優秀青年代表;\n  ;",
        "picUrl": null
      },
      {
        "term": "03",
        "party": "中國國民黨",
        "areaName": "台北縣第三選舉區",
        "onboardDate": "1996/02/01",
        "degree": "板橋國小;自由中學;海山國中;恆毅中學;陸軍官校、步校、軍校;私立東吳大學英文系;國立政治大學東亞研究所;",
        "experience": "1.花蓮師院講師;2.世界新聞學院講師;3.文化大學推廣中心主任;4.中國時報撰述員;5.台北縣議員;6.第二屆立法委員;7.台北縣客家同鄉會理事長;8.台北縣雲林同鄉會顧問;9.台北縣中小企業發展協會理事長;10.台灣各界對日索賠聯合會;11.慈濟功德會",
        "picUrl": "http://www.ly.gov.tw//Images/Legislators/ly1000-300152-1.jpg"
      },
      {
        "term": "04",
        "party": "中國國民黨",
        "areaName": "台北縣第三選舉區",
        "onboardDate": "1999/02/01",
        "degree": "板橋國小;自由中學;海山國中;恆毅中學;陸軍官校、步校、軍校;私立東吳大學英文系;國立政治大學東亞研究所;",
        "experience": "花蓮師院講師;世界新聞學院講師;文化大學推廣中心主任;中國時報撰述員;台北縣議員;第二、三屆立法委員;\n  ;",
        "picUrl": "http://www.ly.gov.tw//Images/Legislators/ly1000-400213-1.jpg"
      }
    ]
  }
}
```
