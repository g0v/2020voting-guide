import React from 'react'
import { Box, Typography } from '@material-ui/core'

type Props = {
  title: string
}
const DecoratedTitle = ({ title }: Props) => {
  return (
    <Box display="flex" alignItems="center" mx={1.5} pt={3}>
        <Box
          width="8px"
          height="24px"
          mr={1}
          borderRadius="4px"
          bgcolor="primary.main"
        />
        <Typography variant="h2">
          {title}
        </Typography>
    </Box>
  )
}

export default DecoratedTitle