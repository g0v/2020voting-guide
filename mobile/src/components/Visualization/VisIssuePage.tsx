import React, { useEffect, useRef, FunctionComponent } from 'react';
import BubbleChart from './BubbleChart';
import './BubbleChart.scss';
import { IssueData } from './visData.js';
import { Button, Select, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    visButton: {
        margin: 5
    },
    visActiveButton: {
        margin: 5,
        color: 'white',
        background: '#3199BA'
    },
    visSelect: {
        fontSize: '18px'
    },
    visSubtitle: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    visSubtitleMobile: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '14px'
    }
});
let vis: any;
const issueTopic = Object.keys(IssueData);
const isMobile: boolean = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);

interface RouteInfo {
    params: {
        topic: string;
    };
}

const VisIssuePage: FunctionComponent<{
        history: any, 
        match: RouteInfo
}> = ({history, match}) => {

    const defaultTopic  = match.params.topic;
    const [data, setData] = React.useState({
        name: 'container',
        children: (IssueData as any)[defaultTopic]
    });
    const [width, setWidth] = React.useState(document.body.clientWidth);
    const [height, setHeight] = React.useState(document.body.clientHeight*0.5);
    const [btn, setBtn] = React.useState(defaultTopic);
    const refElement = useRef(null);


    useEffect(initVis, []);
    useEffect(() => {
      vis.updateDataBubbles(data, width, height, refElement.current, isMobile);
    }, [ data ,width, height ]);

    function initVis() {
        if(data) {
          const d3Props = { data, width, height,};
          vis = new BubbleChart(refElement.current, d3Props, isMobile, history);
        }
      };

    const classes = useStyles();

    const onClickTopic = (topic: any) => {
        setData({
            name: "container",
            children: (IssueData as any)[topic]
        })
        setBtn(topic);
    }
    return (
        <div className='vis-container'>
            <div className='vis-title'>
                <Typography variant="h2">猜猜誰最常看<span> {btn} </span>法?</Typography>
                <Typography className={isMobile ? classes.visSubtitleMobile : classes.visSubtitle}>圓圈大小代表該立委「質詢次數+法案提案」的統計數量</Typography>
                <Typography className={isMobile ? classes.visSubtitleMobile : classes.visSubtitle}>
                    包含 民主進步黨35席, 中國國民黨12席, 時代力量3席, 無黨籍3席, 親民黨1席, 無黨團結聯盟1席
                </Typography>
            </div>
            { isMobile ?
                <div className='vis-controller-mobile'>
                    <Select
                        variant="outlined"
                        className={classes.visSelect}
                        id="isssue-select"
                        value={btn}
                        onChange={(e) => onClickTopic(e.target.value)}
                    >
                        {issueTopic.map((issue, i) =>
                            <MenuItem value={issue} key={i}>{issue}</MenuItem>
                        )}
                    </Select>
                </div> :
                <div className='vis-controller'>
                    {issueTopic.map( (issue, i) => 
                        <div className='vis-controller-btn' key={i}>
                            <Button 
                                className={btn == issue ? classes.visActiveButton : classes.visButton} 
                                variant="outlined"
                                onClick={() => onClickTopic(issue)}
                            >
                                {issue}
                            </Button>
                        </div>
                    )}
                </div>
            }
        <div ref={refElement} className='bubble-chart-container'/>
      </div>
    );
};

export default VisIssuePage;
