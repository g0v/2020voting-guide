import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppDrawer from './components/AppDrawer';
import Candidate from './components/Candidate/Candidate';
import ConstituencyCandidates from './components/ConstituencyCandidates/ConstituencyCandidates';
import County from './components/ConstituencyCounty/County';
import ConstituencyPage from './components/ConstituencyDistrict/ConstituencyPage';
import Nav from './components/Header';
import Home from './components/Home/';
import Party from './components/Party/Party';
import CommingSoon from './components/CommingSoon';
import PartyCandidates from './components/PartyCandidates/PartyCandidates';
import VernacularPage from './components/Vernacular/VernacularPage';
import VernacularListPage from './components/Vernacular/VernacularListPage';

interface State {
    visible: boolean;
}

const useStyles = makeStyles({
    container: {
        padding: 0
    }
});

const App = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Container maxWidth="sm" className={classes.container}>
                <Nav open={open} handleDrawerOpen={handleDrawerOpen} />
                <AppDrawer handleDrawerClose={handleDrawerClose} open={open} />
                <Box>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/county" component={County} />
                        <Route path="/parties" component={PartyCandidates} />
                        <Route path="/party/:party" component={Party} />
                        <Route path="/comming_soon" component={CommingSoon} />
                        <Route path="/candidate/:name" component={Candidate} />
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
            </Container>
            <Switch>
                <Route
                    path="/vernacularlist/:page"
                    component={VernacularListPage}
                />
                <Route path="/vernacular/:billNo" component={VernacularPage} />
            </Switch>
        </>
    );
};

export default App;
