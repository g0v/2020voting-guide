import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  card: {
    width: 600,
    height: 290,
    display: 'flex',
  },
  content: {
    flex: '1 0 auto',
  },
  details: {
    paddingLeft: 40,
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    height: 200,
  },
  cover: {
    width: 200,
  },
  name: {
    fontFamily: 'Noto Serif TC',
  },
  subtitle: {
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: 300,
    fontFamily: 'Noto Sans TC, sans-serif',
  },
  description: {
    paddingTop: 10,
    paddingLeft: 5,
    lineHeight: 1.5,
  },
}));

const AboutInfoBangYu = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image="/images/BangYu.jpg"
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className={classes.name} component="h1" variant="h2">
            溫邦宇
          </Typography>
          <Typography className={classes.subtitle} variant="h5" color="textSecondary">
            神的力量，18歲
          </Typography>
          <Typography className={classes.description} variant="body2">
            帥 <br />
            Python 學霸 <br />
            數據分析大師 <br />
            Data Pipeline 小神童 <br />
            人工智慧之父   <br />
            <strike>單身 </strike> <br />
             帥 <br />
            <br />
          </Typography>
        </CardContent>
      </div>
      <CardActions>
        <Button href="#outlined-buttons" className={classes.button}>
          聯絡電話
        </Button>
      </CardActions>
    </Card>
  );
};

export default AboutInfoBangYu;
