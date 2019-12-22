import { Box, Container } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppDrawer from './components/AppDrawer';
import Candidate from './components/Candidate/Candidate';
import ConstituencyCandidates from './components/ConstituencyCandidates/ConstituencyCandidates';
import County from './components/ConstituencyCounty/County';
import ConstituencyPage from './components/ConstituencyDistrict/ConstituencyPage';
import Footer from './components/Footer';
import Nav from './components/Header';
import Home from './components/Home/';
import Party from './components/Party';
import PartyCandidates from './components/PartyCandidates/PartyCandidates';
import Progressing from './components/Progressing';
import VernacularListPage from './components/Vernacular/VernacularListPage';
import VernacularPage from './components/Vernacular/VernacularPage';
import About from './components/About';
import CandidateCompare from './components/CandidateCompare';

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
        <Container maxWidth={false} className="main-container p-0">
            <Nav open={open} handleDrawerOpen={handleDrawerOpen} />
            <AppDrawer handleDrawerClose={handleDrawerClose} open={open} />
            <Box className="main-container__content">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/parties" component={PartyCandidates} />
                    <Route path="/party/:party" component={Party} />

                    {/* 候選人 /candidate/選舉區/候選人名字 */}
                    <Route
                        path="/candidate/:constituency/:name"
                        component={Candidate}
                    />
                    {/* 區域立委候選人比較 /regional/縣市/選舉區/compare/候選人1,候選人2 */}
                    <Route
                        path="/regional/:county/:constituency/compare/:names"
                        component={CandidateCompare}
                    />
                    {/* 區域立委候選人 /regional/縣市/選舉區 */}
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
                    <Route path="/about" component={About} />
                    <Route
                        path="/vernacularlist/:filter"
                        component={VernacularListPage}
                    />
                    <Route
                        path="/vernacular/:billNo"
                        component={VernacularPage}
                    />
                </Switch>
            </Box>
            <Footer />
        </Container>
    );
};

export default App;
