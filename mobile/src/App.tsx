import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppDrawer from './components/AppDrawer';
import Candidate from './components/Candidate/Candidate';
import CommingSoon from './components/CommingSoon';
import ConstituencyCandidates from './components/ConstituencyCandidates/ConstituencyCandidates';
import County from './components/ConstituencyCounty/County';
import ConstituencyPage from './components/ConstituencyDistrict/ConstituencyPage';
import Nav from './components/Header';
import Home from './components/Home/';
import Party from './components/Party/Party';
import PartyCandidates from './components/PartyCandidates/PartyCandidates';
import Progressing from './components/Progressing';
import VernacularListPage from './components/Vernacular/VernacularListPage';
import VernacularPage from './components/Vernacular/VernacularPage';
import Footer from './components/Footer';

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
            <Container maxWidth={false} className="main-container p-0">
                <Nav open={open} handleDrawerOpen={handleDrawerOpen} />
                <AppDrawer handleDrawerClose={handleDrawerClose} open={open} />
                <Box className="main-container__content">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/parties" component={PartyCandidates} />
                        <Route path="/party/:party" component={Party} />
                        <Route path="/comming_soon" component={CommingSoon} />
                        <Route
                            path="/candidate/:constituency/:name"
                            component={Candidate}
                        />
                        <Route
                            path="/regional/:county/:constituency"
                            component={ConstituencyCandidates}
                        />
                        <Route
                            path="/regional/:county"
                            component={ConstituencyPage}
                        />
                        <Route path="/regional" component={County} />
                        <Route path="/progressing" component={Progressing} />
                    </Switch>
                </Box>
                <Footer />
            </Container>
            <Switch>
                <Route
                    path="/vernacularlist/:filter"
                    component={VernacularListPage}
                />
                <Route path="/vernacular/:billNo" component={VernacularPage} />
            </Switch>
        </>
    );
};

export default App;
