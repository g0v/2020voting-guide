import React from 'react'
import { Box, makeStyles, Avatar, Theme } from '@material-ui/core'

const defaultWidth = 76
const getWidth = (props: Props) => props.width ? props.width : defaultWidth

const useStyles = makeStyles<Theme, Props, any>({
  photo: {
    width: getWidth,
    height: getWidth,
    fontSize: 40
  }
})

type Props = {
  photo: string | null,
  name: string,
  width?: number
}
const AvatarWithPhotoSrc = (props: Props) => {
  const {
    photo, name
  } = props
  const classes = useStyles(props)
  return (
    <>
      {photo ? (
        <Avatar
          src={photo}
          className={classes.photo}
        />
    ) : (
      <Avatar className={classes.photo}>
        {name.charAt(0)}
      </Avatar>
    )}
    </>
  )
}

export default AvatarWithPhotoSrc