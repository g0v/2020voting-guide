import Box from '@material-ui/core/Box';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppDrawer from './components/AppDrawer';
import Candidate from './components/Candidate/Candidate';
import ConstituencyCandidates from './components/ConstituencyCandidates/ConstituencyCandidates';
import ConstituencyPage from './components/ConstituencyDistrict/ConstituencyPage';
import County from './components/CountyConstituency/County';
import Home from './components/Home';
import Nav from './components/Nav';

interface State {
    visible: boolean;
}

const App = () => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Nav open={open} handleDrawerOpen={handleDrawerOpen} />
            <AppDrawer handleDrawerClose={handleDrawerClose} open={open} />

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
        </>
    );
};

export default App;
