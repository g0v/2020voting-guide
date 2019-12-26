import React from 'react'
import { Box, CircularProgress, Typography } from '@material-ui/core'

const Loading = () => {
  return (
    <Box>
      <CircularProgress />
      <Typography>
        {'Loading...'}
      </Typography>
    </Box>
  )
}

export default Loading