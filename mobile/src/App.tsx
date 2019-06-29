import * as React from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.scss';
import { Row, Col, Menu, Icon, Button, Drawer } from 'antd';
import './static/style/button.scss';
import MediaQuery from 'react-responsive';

import Home from './components/Home'


interface AppState {
  interval: number;
  whichPageToFresh: string;
}

class App extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
  }
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <Row className="main-page" style={{ minHeight: window.innerHeight }}>
        <Row className="header">
          <Col span={1} >
            <Button type="ghost" onClick={this.showDrawer}><Icon type="menu" style={{color: 'white'}}/></Button>
          </Col>
          <Col span={22}>
            <Row>
                  <MediaQuery minDeviceWidth={300}>
                      <Row className="nav">
                            <ul>
                              <NavLink exact to="/home">
                                <li className="appName">
                                    2020 投票指南
                                </li>
                              </NavLink>
                            </ul>
                      </Row>
                  </MediaQuery>
              </Row>
          </Col>
          <Col span={1} />
        </Row>
        <Row className="contentBox">
          <Row className="content">
            <Route exact path="/home" component={Home} />
          </Row>
        </Row>
        <Drawer
          title="選區找立委"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </Row>
    );
  }
}

export default App;