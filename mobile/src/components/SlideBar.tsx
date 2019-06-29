import * as React from 'react';
import { Row, Col, Menu, Icon, Select } from 'antd';
import '../static/style/slideBar.scss';
import '../static/style/button.scss';
import MediaQuery from 'react-responsive';

class SlideBar extends React.Component {

    public _isMounted = false;

    render() {
        return (
            <Row>
                <MediaQuery minDeviceWidth={1224}>
                    <Row className="nav">
                        <ul>
                            <li className="appName">2020 投票指南</li>
                        </ul>
                    </Row>
                </MediaQuery>
                
            </Row>
        );
    }
}

export default SlideBar;