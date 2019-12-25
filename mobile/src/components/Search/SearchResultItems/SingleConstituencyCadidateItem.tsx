import React from 'react'
import { Box, Divider, Typography, makeStyles, Card } from '@material-ui/core'
import ConstituencyBreadcrumbs from '../../CommonComponents/ConstituencyBreadcrumbs'
import { SingleConstituencyCandidate } from '../functions/getAllConstituencyCandidates'
import AvatarWithPhotoSrc from '../../CommonComponents/AvatarWithPhotoSrc'
import { RectangleIcon } from '../../PartyIcon'

type Props = SingleConstituencyCandidate

const useStyles = makeStyles((theme) => ({
  outer: {
    paddingBottom: theme.spacing(2),
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
  return (
    <Box className={classes.outer}>
      <Card className={classes.root}>
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
      </Card>
    </Box>
  )
}

export default SingleConstituencyCadidateItem