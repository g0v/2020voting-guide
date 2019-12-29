import React from 'react'
import SingleCandidateItem from '../../Party/SingleCandidateItem'
import { Candidate } from '../../Party/types'
import { ListItem, Card, Typography, Divider, Box, makeStyles, Theme } from '@material-ui/core'
import ResultItemCardWrapper from './ResultItemCardWrapper'

const useStyles = makeStyles((theme: Theme) => ({
  outer: {
    paddingBottom: theme.spacing(2),
  },
  partyName: {
    paddingBottom: theme.spacing(1),
  }
}))

type Props = {
  candidate: Candidate
}
const SingleCandidateItemWithPartyName = ({
  candidate
}: Props) => {
  const classes = useStyles()
  return (
    <ResultItemCardWrapper>
      <ListItem
        button
        component={'a'}
        href={`/party/${candidate.party}`}
      >
        <Box>
          <Box className={classes.partyName}>
            <Typography color={'textSecondary'}>{candidate.party}</Typography>
          </Box>
          <Divider />
          <SingleCandidateItem candidate={candidate} />
        </Box>
      </ListItem>
    </ResultItemCardWrapper>
  )
}

export default SingleCandidateItemWithPartyName