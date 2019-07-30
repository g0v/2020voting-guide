// import { Drawer } from 'antd';
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { Route, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box';
// import './App.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Home from './components/Home';
import ConstituencyCandidates from './components/ConstituencyCandidates/ConstituencyCandidates';
import ConstituencyPage from './components/ConstituencyDistrict/ConstituencyPage';
import County from './components/CountyConstituency/County';
import Candidate from './components/Candidate/Candidate';

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
            <>
                <AppBar>
                    <Toolbar>
                        <Link
                            to="/"
                            style={{ textDecoration: 'none', color: 'white' }}
                        >
                            <Typography variant="h6" color="inherit">
                                投票指南
                            </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
                <Toolbar />

                <Box my={2}>
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

                {/* <Drawer
                    title="選區找立委"
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer> */}
            </>
        );
    }
}

export default App;
