import React, { FunctionComponent } from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/styles';
import {
    Typography,
    Avatar,
    List,
    ListItem,
    Link,
    Box
} from '@material-ui/core';
import Alert from '../Alert';
import { Candidate } from './types';

const useStyles = makeStyles({
  avatar: {
      width: '56px',
      height: '56px'
  },
  dot: {
      color: '#42B72A'
  }
});

function filterExperience(s: string) {
  return s.split('\n')[0].replace(/;/, '');
}

const Rank: FunctionComponent<{ rank: number }> = ({ rank }) => (
  <Box mr={0.5} fontSize="20px" color="#EC502B">
      <Typography variant="body1">{rank}</Typography>
  </Box>
);
const Name: FunctionComponent<{ name: string }> = ({ name }) => (
  <Box mr={1}>
      <Typography variant="h3">{name}</Typography>
  </Box>
);
const Age: FunctionComponent<{ age: string }> = ({ age }) => (
  <Box mr={1}>
      <Typography variant="body2" color="textSecondary">
          {age === '' ? '??' : age} 歲
      </Typography>
  </Box>
);

const Current = () => {
  const classes = useStyles();
  return (
      <Box display="flex" alignItems="center">
          <FiberManualRecordIcon className={classes.dot} fontSize="small" />
          <Typography variant="body2" color="textSecondary">
              現任
          </Typography>
      </Box>
  );
};

const Description: FunctionComponent<{ description: string }> = ({
  description
}) => (
  <Typography variant="body2" color="textSecondary">
      {description}
  </Typography>
);

const SingleCandidateItem: FunctionComponent<{ candidate: Candidate }> = ({ candidate }) => {
  const classes = useStyles();
  return (
      <ListItem divider disableGutters>
          <Box width="100%" display="flex" alignItems="center">
              <Box m={1}>
                  <Avatar className={classes.avatar}>
                      {candidate.name.charAt(0)}
                  </Avatar>
              </Box>
              <Box flexGrow={1}>
                  <Box display="flex" alignItems="center">
                      <Rank rank={candidate.rank} />
                      <Name name={candidate.name} />
                      <Age age={candidate.age} />
                      {candidate.isCurrent && <Current />}
                  </Box>
                  <Description
                      description={filterExperience(candidate.experience)}
                  />
              </Box>
          </Box>
      </ListItem>
  );
};

export default SingleCandidateItem