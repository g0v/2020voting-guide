import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import CandidatePage from './components/CandidatePage';
import AboutPage from './components/AboutPage';
import MapPage from './components/MapPage';
import CandidateListPage from './components/CandidateListPage';


const App = () => (
  <div className="App">
    <BrowserRouter>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          // onClick={handleDrawerOpen}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Tab label="首頁" component={Link} to="/" />
        <Tab label="地圖" component={Link} to="/map" />
        <Tab label="立委候選人" component={Link} to="/candidate" />
        <Tab label="關於" component={Link} to="/about" />
      </Tabs>
      <Container maxWidth="sm">
        <Route exact path="/" component={CandidateListPage} />
        <Route path="/map" component={MapPage} />
        <Route path="/candidate" component={CandidatePage} />
        <Route path="/about" component={AboutPage} />
      </Container>
    </BrowserRouter>
  </div>
);

export default App;
