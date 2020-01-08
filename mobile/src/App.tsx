import { Box, Container } from '@material-ui/core';
import React, { lazy, useState, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppDrawer from './components/AppDrawer';

const About = lazy(() => import('./components/About'));
const Candidate = lazy(() => import('./components/Candidate/Candidate'));
const CandidateCompare = lazy(() => import('./components/CandidateCompare'));
const ConstituencyCandidates = lazy(() => import('./components/ConstituencyCandidates/ConstituencyCandidates'));
const County = lazy(() => import('./components/ConstituencyCounty/County'));
const ConstituencyPage = lazy(() => import('./components/ConstituencyDistrict/ConstituencyPage'));
const Footer = lazy(() => import('./components/Footer'));
const Nav = lazy(() => import('./components/Header'));
const Home = lazy(() => import('./components/Home/'));
const Party = lazy(() => import('./components/Party'));
const PartyCandidates = lazy(() => import('./components/PartyCandidates/PartyCandidates'));
const Progressing = lazy(() => import('./components/Progressing'));
const VernacularListPage = lazy(() => import('./components/Vernacular/VernacularListPage'));
const VernacularPage = lazy(() => import('./components/Vernacular/VernacularPage'));
const VisIssuePage = lazy(() => import('./components/Visualization/VisIssuePage'));
const PartiesCompare = lazy(() => import('./components/PartiesCompare'));

const App = () => {
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = useCallback(() => setOpen(true), []);
    const handleDrawerClose = useCallback(() => setOpen(false), []);
    return (
        <Container maxWidth={false} className="main-container p-0">
            <Nav open={open} handleDrawerOpen={handleDrawerOpen} />
            <AppDrawer handleDrawerClose={handleDrawerClose} open={open} />
            <Box className="main-container__content">
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/* 不分區參選政黨比較 */}
                    <Route path="/parties/compare/:names" component={PartiesCompare} />
                    {/* 不分區參選政黨 */}
                    <Route path="/parties" component={PartyCandidates} />
                    <Route path="/party/:party/candidate/:name" component={Candidate} />
                    {/* party/政黨名稱 */}
                    <Route path="/party/:party/:tab" component={Party} />
                    <Route path="/party/:party" component={Party} />

                    {/* 候選人 /candidate/選舉區/候選人名字 */}
                    <Route path="/candidate/:constituency/:name" component={Candidate} />
                    {/* 區域立委候選人比較 /regional/縣市/選舉區/compare/候選人1,候選人2 */}
                    <Route path="/regional/:county/:constituency/compare/:names" component={CandidateCompare} />
                    {/* 區域立委候選人 /regional/縣市/選舉區 */}
                    <Route path="/regional/:county/:constituency" component={ConstituencyCandidates} />
                    <Route path="/regional/:county" component={ConstituencyPage} />
                    <Route path="/regional" component={County} />
                    <Route path="/progressing" component={Progressing} />
                    <Route path="/about" component={About} />
                    <Route path="/vernacularlist/:filter" component={VernacularListPage} />
                    <Route path="/vernacular/:billNo" component={VernacularPage} />
                    <Route path="/visualization/issue/:topic" component={VisIssuePage} />
                </Switch>
            </Box>
            <Footer />
        </Container>
    );
};

export default App;
