import Box from '@material-ui/core/Box';
import React from 'react';
import constituencyCandidate from '../api/constituencyCandidate.json';
import SummaryCard from './SummaryCard';
import Typography from '@material-ui/core/Typography';


const { candidates, constituency } = constituencyCandidate;

const CandidatePage = () => (
  <div>
    <Typography variant="h4">
      {constituency}
    </Typography>
    <Box m={2} />
    {candidates.map((candidate) => <div><SummaryCard data={candidate} /><Box m={2} /></div>)}
  </div>
);


export default CandidatePage;
