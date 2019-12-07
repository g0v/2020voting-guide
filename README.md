# 2020voting-guide

我們是在 G0V 由設計師和工程師組成的團隊。團隊成員皆是自發無償製作，並且開放所有原始碼，希望能夠推動台灣社會的公民素養和理性思考的風氣。
過去 2016 及 2018 投票指南提供候選人的過去紀錄和中選會等偏向量化的資料供民眾投票參考，不盲目投票。2020 投票指南承襲過去的精神，也另外加入「法案議題」的質性資料、並且優化使用流程，民眾能照自身所關注的議題對照立委提出的法案，理性判斷候選人和政黨，投下有價值的一票。

**[Beta Website](https://voting-guide.appspot.com/)**  
**[Figma Layout](https://www.figma.com/file/K1nPlmHij67rcZVqse0tWjs4/%E6%8A%95%E7%A5%A8%E6%8C%87%E6%8C%87%E5%8D%97?node-id=1053%3A16729)**

## 最後更新日期

區域立委: 2019/12/07
廣告: 2019/12/07

## Starting DEV Servers

mobile:

1. `cd /mobile`
2. `npm start`

backend:

1. `cd /backend`
2. `go run main.go`

crawler:

1. `cd /crawler`
2. `bash crawl_all.sh`

## Deploy to App Engine

`./deploy.sh`
