import React, { useState } from 'react';
import { Button, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { border } from '@material-ui/system';

const useStyles = makeStyles({
    active: {
        color: '#EC502B',
        border: '1px solid #EC502B',
        background: "#FFF2F2"
    }
});


const CurrentLegislatorIssue = () => {
    const btnArray = ['交通建設', '經濟貿易', '財政金融', '勞動人力', '衛生社福', '國家發展'];
    const [btn, setBtn] = useState('交通建設');
    const classes = useStyles();
    return (
        <div className="current-legislator">
            <Box mx={1} mb={3} className="current-legislator-title" >
                <Typography variant="h2">猜猜誰最常看<span className='current-legislator-title__highlight'>  {btn}  </span>法？</Typography>
            </Box>
            <Typography>選你在乎的議題  爭取連任的立委比一比</Typography>
            <div className='butten-area'>
                {btnArray.map((topic, i) => 
                    <Button
                        key={i}
                        variant="outlined"
                        color="primary"
                        className={btn == topic ? `${classes.active} butten-area-btn` : `butten-area-btn`}
                        onClick={() => setBtn(topic)}
                    >
                        <Typography variant="h3">{topic}</Typography>
                    </Button>
                )}
                <Button
                    variant="outlined"
                    color="primary"
                    href="/visualization/issue/內政"
                    className="butten-area-btn"
                >
                    <Typography variant="h3">更多議題...</Typography>
                </Button>
            </div>
            <Button
                variant="outlined"
                color="primary"
                href={`/visualization/issue/${btn}`}
                className="page-home__primary-btn"
            >
                    <Typography variant="h3">看結果</Typography>
            </Button>
        </div>
    );
};

export default CurrentLegislatorIssue;
