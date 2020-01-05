import React, { useEffect, useRef, FunctionComponent } from 'react';
import BubbleChart from './BubbleChart';
import { d3method } from './types'; 
import './BubbleChart.scss';
import { IssueData } from './visData.js';
import { Button, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';

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
    }
});
let vis: any;
const issueTopic = Object.keys(IssueData);
const isMobile: boolean = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
interface Props extends RouteComponentProps {}

const VisIssuePage = (props: Props) => {
    const defaultTopic = issueTopic[0];

    const [data, setData] = React.useState({
        name: 'container',
        children: (IssueData as any)[defaultTopic]
    });
    const [width, setWidth] = React.useState(document.body.clientWidth);
    const [height, setHeight] = React.useState(document.body.clientHeight*0.5);
    const [btn, setBtn] = React.useState(issueTopic[0]);
    const refElement = useRef(null);


    useEffect(initVis, []);
    useEffect(() => {
      vis.updateDataBubbles(data, width, height, refElement.current, isMobile);
    }, [ data ,width, height ]);

    function initVis() {
        if(data) {
          const d3Props = { data, width, height,};
          vis = new BubbleChart(refElement.current, d3Props, isMobile, props.history);
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
