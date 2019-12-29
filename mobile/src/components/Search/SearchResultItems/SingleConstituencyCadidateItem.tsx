import React from 'react'
import { Box, Divider, Typography, makeStyles, Card, ListItem } from '@material-ui/core'
import ConstituencyBreadcrumbs from '../../CommonComponents/ConstituencyBreadcrumbs'
import { SingleConstituencyCandidate } from '../functions/getAllConstituencyCandidates'
import AvatarWithPhotoSrc from '../../CommonComponents/AvatarWithPhotoSrc'
import { RectangleIcon } from '../../PartyIcon'
import ResultItemCardWrapper from './ResultItemCardWrapper'

type Props = SingleConstituencyCandidate

const useStyles = makeStyles((theme) => ({
  outer: {
    paddingBottom: theme.spacing(2),
  },
  listItem: {
    display: 'inline-block',
  },
  root: {
    // maxWidth: 500,
    padding: theme.spacing(2),
  },
  bottomPart: {
    padding: theme.spacing(1.5)
  },
  candidateInfoPart: {
    width: '70%',
    paddingLeft: theme.spacing(1.5)
  },
  candidateName: {
    paddingRight: theme.spacing(1.5)
  }
}))

const CandidateInfoPart = (props: Props) => {
  const classes = useStyles()
  return (
    <Box className={classes.candidateInfoPart}>
      <Box 
        display={'flex'}
        alignItems={'center'}
      >
        <Typography variant={'h3'} className={classes.candidateName}>
          {props.name}
        </Typography>
        <RectangleIcon {...props} />
      </Box>
      <Typography
        variant="h4"
        color="textSecondary"
        noWrap
        align='left'
      >
        {props.experience}
      </Typography>
    </Box>
  )
}

const SingleConstituencyCadidateItem = (props: Props) => {
  const classes = useStyles()
  const {
    constituency, name
  } = props
  const href = `/candidate/${constituency}/${name}`
  return (
    <ResultItemCardWrapper>
      <ListItem button component={'a'} href={href} className={classes.listItem}>
        <Box>
          <ConstituencyBreadcrumbs {...props} />
          <Divider />
            <Box 
              display={'flex'} 
              alignItems={'center'} 
              className={classes.bottomPart}
            >
              <AvatarWithPhotoSrc {...props} />
              <CandidateInfoPart {...props} />
            </Box>
        </Box>
      </ListItem>
    </ResultItemCardWrapper>
  )
}

export default SingleConstituencyCadidateItem