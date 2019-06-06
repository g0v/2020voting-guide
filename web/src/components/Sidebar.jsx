import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

const geographicalConstituency = [
  {'name': '基隆市', 'area': ['基隆市選舉區']},
  {'name': '臺北市', 'area': ['臺北市第一選舉區', '臺北市第二選舉區', '臺北市第三選舉區', '臺北市第四選舉區', '臺北市第五選舉區', '臺北市第六選舉區', '臺北市第七選舉區', '臺北市第八選舉區']},
  {'name': '新北市', 'area': ['新北市第一選舉區', '新北市第二選舉區', '新北市第三選舉區', '新北市第四選舉區', '新北市第五選舉區', '新北市第六選舉區', '新北市第七選舉區', '新北市第八選舉區', '新北市第九選舉區', '新北市第十選舉區', '新北市第十一選舉區', '新北市第十二選舉區']},
  {'name': '桃園市', 'area': ['桃園市第一選舉區', '桃園市第二選舉區', '桃園市第三選舉區', '桃園市第四選舉區', '桃園市第五選舉區', '桃園市第六選舉區']},
  {'name': '新竹市', 'area': ['新竹市選舉區']},
  {'name': '新竹縣', 'area': ['新竹縣第一選舉區', '新竹縣第二選舉區']},
  {'name': '苗栗縣', 'area': ['苗栗縣第一選舉區', '苗栗縣第二選舉區']},
  {'name': '臺中市', 'area': ['臺中市第一選舉區', '臺中市第二選舉區', '臺中市第三選舉區', '臺中市第四選舉區', '臺中市第五選舉區', '臺中市第六選舉區', '臺中市第七選舉區', '臺中市第八選舉區']},
  {'name': '彰化縣', 'area': ['彰化縣第一選舉區', '彰化縣第二選舉區', '彰化縣第三選舉區', '彰化縣第四選舉區']},
  {'name': '南投縣', 'area': ['南投縣第一選舉區', '南投縣第二選舉區']},
  {'name': '雲林縣', 'area': ['雲林縣第一選舉區', '雲林縣第二選舉區']},
  {'name': '嘉義市', 'area': ['嘉義市選舉區']},
  {'name': '嘉義縣', 'area': ['嘉義縣第一選舉區', '嘉義縣第二選舉區']},
  {'name': '臺南市', 'area': ['臺南市第一選舉區', '臺南市第二選舉區', '臺南市第三選舉區', '臺南市第四選舉區', '臺南市第五選舉區', '臺南市第六選舉區']},
  {'name': '高雄市', 'area': ['高雄市第一選舉區', '高雄市第二選舉區', '高雄市第三選舉區', '高雄市第四選舉區', '高雄市第五選舉區', '高雄市第六選舉區', '高雄市第七選舉區', '高雄市第八選舉區']},
  {'name': '屏東縣', 'area': ['屏東縣第一選舉區', '屏東縣第二選舉區']},
  {'name': '臺東縣', 'area': ['臺東縣選舉區']},
  {'name': '花蓮縣', 'area': ['花蓮縣選舉區']},
  {'name': '宜蘭縣', 'area': ['宜蘭縣選舉區']},
  {'name': '澎湖縣', 'area': ['澎湖縣選舉區']},
  {'name': '金門縣', 'area': ['金門縣選舉區']},
  {'name': '連江縣', 'area': ['連江縣選舉區']},
  {'name': '原住民', 'area': ['山地原住民選舉區', '平地原住民選舉區']},
];

// const classes = {
//   drawer: {
//     width: 240,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: 240,
//   },
// };

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counties: this.initCounties(),
    };
    this.getCountyItem = this.getCountyItem.bind(this);
    this.toggleCounty = this.toggleCounty.bind(this);
    this.initCounties = this.initCounties.bind(this);
  }

  initCounties() {
    const countiesState = {};
    geographicalConstituency.map((county) => county.name).forEach((countyName) => countiesState[countyName] = false);
    console.log(countiesState);
    return countiesState;
  }

  toggleCounty(county) {
    const { counties } = this.state;
    console.log(counties);
    this.setState({ counties: {...counties, [county]: !counties[county]}});
  }

  getCountyItem(countyData) {
    const { counties } = this.state;
    // if (!counties) return;
    if (counties[countyData.name]) {
      return (
        <ListItem button key={countyData.name}>
          <ListItemText primary={countyData.name} onClick={() => this.toggleCounty(countyData.name)} />
          <List>
            {countyData['area'].map((area) => <ListItem button key={area}><ListItemText primary={area} /></ListItem>)}
          </List>
        </ListItem>
      );
    } else {
      return (
        <ListItem button key={countyData.name} onClick={() => this.toggleCounty(countyData.name)}>
          <ListItemText primary={countyData.name} />
        </ListItem>
      );
    }
  }

  render() {
    return (
      <Drawer
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          {geographicalConstituency.map(this.getCountyItem)}
        </List>
        <Divider />
      </Drawer>
    );
  }
}

export default Sidebar;
