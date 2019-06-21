import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import CandidatePage from './components/CandidatePage';
import AboutPage from './components/AboutPage';
import MapPage from './components/MapPage';
import CandidateListPage from './components/CandidateListPage';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  tab: {
    fontSize: '28px'
  },
}));

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab className={classes.tab} label="首頁" component={Link} to="/" />
          <Tab className={classes.tab} label="地圖" component={Link} to="/map" />
          <Tab className={classes.tab} label="立委候選人" component={Link} to="/candidate" />
          <Tab className={classes.tab} label="關於" component={Link} to="/about" />
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
}

export default App;
