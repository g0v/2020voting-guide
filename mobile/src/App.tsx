import * as React from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';
import SlideBar from './components/SlideBar';
import { Row, Col, Menu, Icon, Select } from 'antd';
import './static/style/slideBar.scss';
import './static/style/button.scss';
import MediaQuery from 'react-responsive';

import Home from './components/Home'


interface AppState {
  interval: number;
  whichPageToFresh: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      interval: 10, // sendons
      whichPageToFresh: ''
    };
  }

  render() {
    return (
      <Row className="main-page" style={{ minHeight: window.innerHeight }}>
        <Row className="header">
          <Col span={1} ></Col>
          <Col span={22}>
            <Row>
                  <MediaQuery minDeviceWidth={300}>
                      <Row className="nav">
                          <ul>
                          <NavLink exact to="/home"><li className="appName">
                                2020 投票指南
                              </li></NavLink>
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
      </Row>
    );
  }
}

export default App;