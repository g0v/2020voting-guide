import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import legislator from '../api/legislator.json';
import Box from '@material-ui/core/Box';


const partyEnglishName = {
  '國民黨': 'KMT',
  '民進黨': 'DPP',
  '時代力量': 'NPP',
  '安定力量': 'SOP',
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  card: {
    width: 500,
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
    fontFamily: 'Noto Sans TC',
  },
  subtitle: {
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: 300,
    fontFamily: 'Noto TC, sans-serif',
  },
  description: {
    paddingTop: 10,
    paddingLeft: 5,
    lineHeight: 1.5,
  },
  badge: {
    width: 170,
    // height: 100,
  },
}));

const InfoCard = (props) => {
  const classes = useStyles();
  const { name, party, picUrl } = props.data;
  const partyBadge = `/images/badges/${partyEnglishName[party]}.png`;
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
          <Box m={2} />
          <img src={partyBadge} alt={partyBadge} className={classes.badge} />
        </CardContent>
      </div>
    </Card>
  );
};

export default InfoCard;
