import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AboutInfoBangYu from './AboutInfoBangYu';
import AboutInfoPoChung from './AboutInfoPoChung';
import AboutInfoKbear from './AboutInfoKbear';
import AboutInfoTerence from './AboutInfoTerence';
import AboutInfoJiaXuan from './AboutInfoJiaXuan';
import AboutInfoChloe from "./AboutInfoChloe";



const CandidatePage = () => (
  <div>
    <CardContent>
      <Typography component="h5" variant="h5">
        共同作者
      </Typography>
      <Box m={1} />
      <AboutInfoBangYu />
      <Box m={1} />
      <AboutInfoPoChung />
      <Box m={1} />
      <AboutInfoKbear />
      <Box m={1} />
      <AboutInfoTerence />
      <Box m={1} />
      <AboutInfoJiaXuan />
      <Box m={1} />
      <AboutInfoChloe />
    </CardContent>
  </div>
);


export default CandidatePage;
