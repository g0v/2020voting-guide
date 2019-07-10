import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <h3>2020 投票指南</h3>
        <div>
            減少盲目支持，從更多的理解和認識，選擇你真正認同的候選人。
            <br></br>
            整合政府開放資料，提供民眾對照，快速比較出你支持的政黨、候選人。
        </div>
        <div>
            <Button style={{ backgroundColor: '#018786', color: 'white' }}>
                比較政黨
            </Button>
        </div>
        <div>
            <Button style={{ backgroundColor: '#018786', color: 'white' }}>
                <Link to="/regionals">比較區域立委</Link>
            </Button>
        </div>
        <h3>立委工作說明</h3>
        <div>The News Lens 關鍵評論網 - 立委的一天在幹嘛?</div>
        <iframe
            title="立委一天在幹嘛"
            width="100%"
            src="https://www.youtube.com/embed/lOCqaZ5Pb_w"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <div>
            身為不分區立委的助理A解釋道，「一般來說，在會期裡一週的一三四是委員會；二五則是院會。其中一三四的委員會，早上會是最緊繃的，有關質詢重點、議題都得會花很多時間找資料、準備，或是配合黨團開記者會等。而二五院會，從早上到下午2～3點之前都在立法院，結束後才會回地方跑選區。」
            「在會期中，委員2/3的時間、精神、功夫都在立法院，也非常注重問政品質、和自己上台質詢的表現。」但是真的每個立委都是這樣嗎？
            國會助理B則指出，「以區域立委來說，一天可能只有4～5個小時上台北跑國會、8～9個鐘頭都在跑地方，若立法院有重要會議要開，或是表決之類的重要行程，可能一整天都在立法院，至於跑地方則要留在晚上。」
            助理C表示，「我們委員每天至少五點半、六點就起來了，大部份時間甚至起得比助理還早。而為了多跟地方上的『頭人』見面，最晚能跑到半夜兩三點。因為每個選民的事情都是大事，都必須花時間去理解。」{' '}
        </div>
        <h3>立委選舉投票規則</h3>
        <div>The News Lens 關鍵評論網 - 什麼是政黨票?</div>
        <iframe
            title="立委一天在幹嘛"
            width="100%"
            src="https://www.youtube.com/embed/zPkX6cn4oMg"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <div>
            身為不分區立委的助理A解釋道，「一般來說，在會期裡一週的一三四是委員會；二五則是院會。其中一三四的委員會，早上會是最緊繃的，有關質詢重點、議題都得會花很多時間找資料、準備，或是配合黨團開記者會等。而二五院會，從早上到下午2～3點之前都在立法院，結束後才會回地方跑選區。」
            「在會期中，委員2/3的時間、精神、功夫都在立法院，也非常注重問政品質、和自己上台質詢的表現。」但是真的每個立委都是這樣嗎？
            國會助理B則指出，「以區域立委來說，一天可能只有4～5個小時上台北跑國會、8～9個鐘頭都在跑地方，若立法院有重要會議要開，或是表決之類的重要行程，可能一整天都在立法院，至於跑地方則要留在晚上。」
            助理C表示，「我們委員每天至少五點半、六點就起來了，大部份時間甚至起得比助理還早。而為了多跟地方上的『頭人』見面，最晚能跑到半夜兩三點。因為每個選民的事情都是大事，都必須花時間去理解。」{' '}
        </div>
    </div>
);

export default Home;