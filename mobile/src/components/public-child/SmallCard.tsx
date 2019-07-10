import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    constituencyArea: {
      lineHeight: '24px',
      '&:hover': {
        color: '#aaa'
      },
      backgroundColor: '#cacbcc',
      padding: theme.spacing(2),
      margin: theme.spacing(1),
      cursor: 'pointer'
    }
  })
);

interface SmallCardProps {
  target: string,
  name: string
}

const SmallCard = ({ target, name }: SmallCardProps) => {

  const classes = useStyles();
  return (
    <Link to={target}>
      <div className={classes.constituencyArea}>{name}</div>
    </Link>
  )

}
export default SmallCard;