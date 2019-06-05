import React from 'react';
import Box from '@material-ui/core/Box';
import InfoCard from './InfoCard';
import InfoDetails from './InfoDetails';

const CandidatePage = () => (
  <div>
    <InfoCard />
    <Box m={2} />
    <InfoDetails />
  </div>
);


export default CandidatePage;
