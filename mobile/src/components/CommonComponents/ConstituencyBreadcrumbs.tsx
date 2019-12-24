import React from 'react'
import { Box, Breadcrumbs, Link, Typography } from '@material-ui/core'
import { NavigateNext } from '@material-ui/icons'
import {  } from 'react-router-dom'
import Navigation from '../Navigation'

type Props = {
  county: string,
  constituency: string
}

const SingleLink = ({link}: {
  link: string
}) => (
  <Link href={`/regional/${link}`}>
    <Typography variant="h4" color="textSecondary">
      {link}
    </Typography>
  </Link>
)

const ConstituencyBreadcrumbs = ({
  county, constituency
}: Props) => {
  return (
    <Navigation title="區域立委候選人">
      <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
        <SingleLink link={county} />
        <SingleLink link={constituency} />
      </Breadcrumbs>
  </Navigation>
  )
}

export default ConstituencyBreadcrumbs