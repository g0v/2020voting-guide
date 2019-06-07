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
    "林昶佐": {
        "current_info": [{
            "sex": "男",
            "picUrl": "http://www.ly.gov.tw//Images/Legislators/90030.jpg",
            "fax": "國會研究室：02-2358-6125;中正萬華服務處：02-2302-8950",
            "tel": "國會研究室：02-2358-6121;中正萬華服務處：02-2302-8910",
            "addr": "國會研究室：10051臺北市中正區濟南路1段3-1號0803室;中正萬華服務處：100臺北市中正區莒光路88號",
            "party": "時代力量",
            "degree": "國立台北大學企業管理學系學士",
            "partyGroup": "時代力量",
            "areaName": "臺北市第5選舉區",
            "committee": "第9屆第1會期：外交及國防委員會;第9屆第2會期：外交及國防委員會;第9屆第3會期：外交及國防委員會;第9屆第4會期：外交及國防委員會;第9屆第5會期：外交及國防委員會;第9屆第6會期：外交及國防委員會;第9屆第7會期：外交及國防委員會;",
            "term": "09",
            "leaveReason": null,
            "name": "林昶佐",
            "ename": "Lim, Tshiong-Tso",
            "leaveFlag": "否",
            "experience": "時代力量創黨工程隊總隊長\n時代力量主席團成員\n國際知名閃靈樂團主唱\n國際特赦組織台灣分會理事長\n行政院二二八基金會董事\n獨立音樂協會理事長\n曾獲金曲獎、總統文化獎",
            "leaveDate": null,
            "onboardDate": "2016/02/01"
        }],
        "history_info": [{
            "sex": "男",
            "picUrl": "http://www.ly.gov.tw//Images/Legislators/90030.jpg",
            "party": "時代力量",
            "degree": "國立台北大學企業管理學系學士;",
            "partyGroup": "時代力量",
            "areaName": "臺北市第5選舉區",
            "committee": "第9屆第1會期：外交及國防委員會;第9屆第2會期：外交及國防委員會;第9屆第3會期：外交及國防委員會;第9屆第4會期：外交及國防委員會;第9屆第5會期：外交及國防委員會;第9屆第6會期：外交及國防委員會;第9屆第7會期：外交及國防委員會;",
            "term": "09",
            "leaveReason": null,
            "name": "林昶佐",
            "ename": "Lim, Tshiong-Tso",
            "leaveFlag": "否",
            "experience": "時代力量創黨工程隊總隊長;時代力量主席團成員;國際知名閃靈樂團主唱;國際特赦組織台灣分會理事長;行政院二二八基金會董事;獨立音樂協會理事長;曾獲金曲獎、總統文化獎;\n  ;",
            "leaveDate": null,
            "onboardDate": "2016/02/01"
        }]
    },
}
```
