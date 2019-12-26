import React, { ReactNode } from 'react'
import { Box, Card, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  outer: {
    paddingBottom: theme.spacing(2),
  },
}))

type Props = {
  children: ReactNode
}
const ResultItemCardWrapper = ({ children }: Props) => {
  const classes = useStyles()
  return (
    <Box className={classes.outer}>
      <Card>
        {children}
      </Card>
    </Box>
  )
}

export default ResultItemCardWrapper