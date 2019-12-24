import React from 'react'
import { Box, Typography } from '@material-ui/core'

type Props = {
  currentLegislator: boolean
}

const GreenDot = () => (
  <Box
    height={15}
    width={15}
    ml={1}
    borderRadius="50%"
    bgcolor="green"
    display="inline-block"
  />
)

const CurrentLegislator = ({
  currentLegislator
}: Props) => {
  return (
    <Box height={25}>
      {currentLegislator && (
        <>
          <GreenDot />
          <Typography 
            variant="h4" 
            color="textSecondary" 
            display="inline"
          >
          {' 現任'}
          </Typography>
        </>
      )}
  </Box>
  )
}

export default CurrentLegislator