import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import legislator from '../api/legislator.json';


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
    textAlign: 'left',
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

const InfoCard = () => {
  const classes = useStyles();
  const { name, party, age, experience, picUrl } = legislator;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={picUrl}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className={classes.name} component="h1" variant="h2">
            {name}
          </Typography>
          <Typography className={classes.subtitle} variant="h5" color="textSecondary">
            {party}，{age}歲
          </Typography>
          <Typography className={classes.description} variant="body2">
            {experience.map((exp) => <span>{exp}<br /></span> )}
          </Typography>
        </CardContent>
      </div>
      <CardActions>
        <Button href="#outlined-buttons" className={classes.button}>
          Link
        </Button>
      </CardActions>
    </Card>
  );
};

export default InfoCard;
