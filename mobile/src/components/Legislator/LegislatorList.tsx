import React from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import SmallCard from '../public-child/SmallCard';
import { Link } from 'react-router-dom';
const useStyles = (theme: Theme) => ({

  constituencyArea: {
    lineHeight: '36px',
    '&:hover': {
      color: '#aaa'
    },
    backgroundColor: '#cacbcc',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    cursor: 'pointer'
  },
  title: {
    lineHeight: '24px',
  }
})


class LegislatorList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.goBack = this.goBack.bind(this)
  }
  goBack() {
    const { history } = this.props
    history.goBack()
  }


  render() {
    console.log(this)
    const { classes } = this.props
    return (
      <>
        <div className={classes.title}>
          <Button onClick={this.goBack}><NavigateBefore />選區找立委</Button>
        </div>
        <SmallCard name={'abcde'} target={this.props.match.path + 'abcd'}></SmallCard>
        {/*add Candidate Card here*/}
      </>
    )
  }
}


export default withStyles(useStyles)(LegislatorList);