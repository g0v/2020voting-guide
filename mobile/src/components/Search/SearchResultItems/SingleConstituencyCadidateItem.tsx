import React from 'react'
import { Box, Divider } from '@material-ui/core'
import ConstituencyBreadcrumbs from '../../CommonComponents/ConstituencyBreadcrumbs'
import { SingleConstituencyCandidate } from '../functions/getAllConstituencyCandidates'

type Props = SingleConstituencyCandidate
const SingleConstituencyCadidateItem = (props: Props) => {
  return (
    <Box>
      <ConstituencyBreadcrumbs {...props} />
      <Divider />
      
    </Box>
  )
}

export default SingleConstituencyCadidateItem