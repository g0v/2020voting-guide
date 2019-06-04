import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const CandidatePage = () => (
  <div>
    <CardContent>
      <Typography component="h5" variant="h5">
        共同作者
      </Typography>
      <Box m={1} />
      <Typography variant="h5">溫邦宇</Typography>
      <Typography variant="h5">金伯仲</Typography>
      <Typography variant="h5">林佳鴻</Typography>
      <Typography variant="h5">倫斯</Typography>
    </CardContent>
  </div>
);


export default CandidatePage;