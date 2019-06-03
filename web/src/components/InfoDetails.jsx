import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Tooltip } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const data = [
  {
    'name': '脫黨表決',
    '百分比': 0.69,
    'pv': 8,
    'fill': '#82ca9d',
  },
  {
    'name': '投票表決',
    '百分比': 59.40,
    'pv': '689/1160',
    'fill': '#83a6ed',
  },
  {
    'name': '院會出席',
    '百分比': 99,
    'pv': '303/304',
    'fill': '#8884d8',
  },
];

const data01 = [
  {
    'name': 'Group A',
    'value': 400,
  },
  {
    'name': 'Group B',
    'value': 300,
  },
  {
    'name': 'Group C',
    'value': 300,
  },
  {
    'name': 'Group D',
    'value': 200,
  },
  {
    'name': 'Group E',
    'value': 278,
  },
  {
    'name': 'Group F',
    'value': 189,
  },
];
const data02 = [
  {
    'name': 'Group A',
    'value': 2400,
  },
  {
    'name': 'Group B',
    'value': 4567,
  },
  {
    'name': 'Group C',
    'value': 1398,
  },
  {
    'name': 'Group D',
    'value': 9800,
  },
  {
    'name': 'Group E',
    'value': 3908,
  },
  {
    'name': 'Group F',
    'value': 4800,
  },
];

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
            法案
          </Typography>
          <BarChart data={data} layout="vertical" width={500} height={100} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" />
            <Tooltip formatter={(value) => value + '%'}/>
            <Bar dataKey="百分比"/>
          </BarChart>
        </CardContent>
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
            政見
          </Typography>
          <Typography className={classes.description} variant="body2">
            一、蔡英文中正萬華唯一支持林昶佐，團結進步力量，促成國會改革。 <br />
            二、捍衛台灣主權，強化國際地位，堅持台灣與中國對等往來。 <br />
            三、全力推動進度落後的捷運萬大線，帶動人潮流動，繁榮地方發展。 <br />
            四、強化食品安全認證機制，嚴格查驗非法原料，嚴懲黑心食品廠商，讓消費者吃得安心。 <br />
            五、推動智慧節能電網，鼓勵綠色能源，讓台灣成為永續發展的非核家園。 <br />
            六、下修公投法與選罷法門檻，落實直接民權，讓人民對政府不當政策與劣質政客有說不的權利。 <br />
            七、制定《政黨不當取得財產處理條例》，追討政黨不當財產，杜絕貪污腐敗。 <br />
            八、強化台灣青年力，投票年齡下修十八歲與世界接軌，創造青年創業友善環境，讓年輕人勇敢逐夢。 <br />
            九、規劃短、中、長期社區長照政策以及促進長照相關產業發展，讓銀髮族安心樂活。 <br />
            十、支持穩健的稅制改革，縮小貧富差距，打造公平正義的社會。 <br />
            十一、修正《都更法》，加速推動保障住戶權益的都市更新，落實在地精神。 <br />
            十二、活化閒置國有地，提供地方公共使用。
          </Typography>
        </CardContent>
        <CardContent className={classes.content}>
          <Typography className={classes.title} component="h5" variant="h5">
            政治獻金
          </Typography>
          <PieChart width={730} height={250}>
            <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
            <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
          </PieChart>
        </CardContent>
      </div>
    </Card>
  );
};

export default InfoDetails;
