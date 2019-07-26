import { Button, Col, Drawer, Icon, Row } from 'antd';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { NavLink, Route, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import './App.scss';
import Home from './components/Home';
import ConstituencyCandidates from './components/ConstituencyCandidates/ConstituencyCandidates';
import ConstituencyPage from './components/ConstituencyDistrict/ConstituencyPage';
import County from './components/CountyConstituency/County';
import Candidate from './components/Candidate/Candidate';
import './static/style/button.scss';

interface State {
    visible: boolean;
}

class App extends React.Component<{}, State> {
    state = { visible: false };
    showDrawer = (): void => {
        this.setState({
            visible: true
        });
    };

    onClose = (): void => {
        this.setState({
            visible: false
        });
    };

    render() {
        return (
            <Row
                className="main-page"
                style={{ minHeight: window.innerHeight }}
            >
                <Row className="header">
                    <Col span={1}>
                        <Button type="ghost" onClick={this.showDrawer}>
                            <Icon type="menu" style={{ color: 'white' }} />
                        </Button>
                    </Col>
                    <Col span={22}>
                        <Row>
                            <MediaQuery minDeviceWidth={300}>
                                <Row className="nav">
                                    <ul>
                                        <NavLink exact to="/">
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
                <Box mt="74px" mb="30px">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/county" component={County} />
                        <Route path="/candidate" component={Candidate} />
                        <Route
                            path="/regional/:county/:constituency"
                            component={ConstituencyCandidates}
                        />
                        <Route
                            path="/regional/:county"
                            component={ConstituencyPage}
                        />
                    </Switch>
                </Box>
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
