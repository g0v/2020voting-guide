import React from 'react';
import ReactDOM from 'react-dom';
import { Divider, Button } from 'antd';


class home extends React.Component {
    render () {
        return (
            <div>
                <h3>2020 投票指南</h3>
                <div>
                    減少盲目支持，從更多的理解和認識，選擇你真正認同的候選人。<br></br>
                    整合政府開放資料，提供民眾對照，快速比較出你支持的政黨、候選人。
                </div>
                <Divider />
                <Button style={{'backgroundColor': '#018786', color: 'white'}}>比較政黨</Button>
                <Button style={{'backgroundColor': '#018786', color: 'white'}}>比較區域立委</Button>
            </div>
        )
    }
}
export default home;