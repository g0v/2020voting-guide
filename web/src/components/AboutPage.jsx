import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AboutInfoCard from './AboutInfoCard';

const CandidatePage = () => (
  <div>
    <CardContent>
      <Typography component="h5" variant="h5">
        共同作者
      </Typography>
      <Box m={1} />
      <AboutInfoCard />
      <Typography variant="h5">溫邦宇</Typography>
      <Typography variant="h5">金柏仲</Typography>
      <Typography variant="h5">林佳鴻</Typography>
      <Typography variant="h5">倫斯</Typography>
      <Typography variant="h5">Jia-Xuan Lee</Typography>
      <Typography variant="h5">倫斯</Typography>
      <Typography variant="h5">chloe</Typography>
    </CardContent>
  </div>
);


export default CandidatePage;
