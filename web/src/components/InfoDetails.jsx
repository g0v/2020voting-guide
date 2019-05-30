import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const InfoDetails = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className={classes.title} component="h5" variant="h5">
            學歷
          </Typography>
          <Typography className={classes.description} variant="body2">
            國立台北大學企業管理學系學士
          </Typography>
        </CardContent>
        <CardContent className={classes.content}>
          <Typography className={classes.title} component="h5" variant="h5">
            政治獻金
          </Typography>
          <Typography className={classes.description} variant="body2">
            國立台北大學企業管理學系學士
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default InfoDetails;
