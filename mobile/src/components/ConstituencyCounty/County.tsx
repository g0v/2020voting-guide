import {
    Breadcrumbs,
    List,
    ListItem,
    ListItemText,
    Typography,
    Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { useCallback, useEffect, useState } from 'react';
import countyConstituency from '../../data/county_constituency.json';
import Navigation from '../Navigation';
import { Theme, useTheme } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { PartyColorLookup } from '../PartyIcon';

// s=>[...s].map(c=>d=(i="零一二三四五六七八九十百".search(c))>9?(n+=(d||1)*(i*90-890),0):i,n=d=0)&&n+d
const chineseToNumber = (chineseString: string) => {
    const allChineseNumber = "零一二三四五六七八九十百";
    let n = 0;
    let d = 0;

    [...chineseString].map(char => {
        const i = allChineseNumber.search(char);
        if (i > 9) {
            n += (d||1) * (i*90-890);
        } else {
            d = i;
        }
    });

    const result = n + d;
    return result;
}

interface DistrictInterface {
    name: string,
    party: [string]
}

const sortDistrict = (districtArray: [DistrictInterface]) => {
    const regularExpression = '第(.*)選舉';

    if (districtArray.length <= 1) {
        return districtArray;
    } else {
        try {
            const sorted = Array.from(districtArray).sort((a: DistrictInterface,b: DistrictInterface) => {
                const districtNameA: string = a['name'];
                const districtNameB: string = b['name'];

                const matchedA = (new RegExp(regularExpression, 'g')).exec(districtNameA);
                const matchedB = (new RegExp(regularExpression, 'g')).exec(districtNameB);


                if (matchedA && matchedB) {
                    const stringA: string = matchedA[1];
                    const stringB: string = matchedB[1];

                    if (stringA && stringB) {
                        const numberA: number = chineseToNumber(stringA);
                        const numberB: number = chineseToNumber(stringB);
                        const compareResult: number = numberA - numberB;
                                           
                        return compareResult;
                    }              
                }

                return 0;
            });

            return sorted;
        } catch(e) {
            console.log(e);
            return districtArray;
        }
    }
};


const desktopStyle = makeStyles({
    listItemWrapper: {
    },    
    listItemContainer: {
        width: '80%',
        'text-align': 'left',
        position: 'relative',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    listItemContainerMeasureWrapper: {
        position: 'absolute',
        'z-index': -1,
        visibility: 'hidden',
    },
    listItemContainerMeasure: {
        display: 'inline',
    },
    listItem: {
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        position: 'relative',
        marginTop: '24px',
        marginRight: '8px',
        marginLeft: '8px',
        paddingTop: '45px',
        paddingLeft: '28px',
        width: '316px',
        height: '182px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.03)',
        borderRadius: '4px',
        display: 'inline-block',
    },
    regionName: {
        boxSizing: 'border-box',
        display: 'block',
        height: '24px',
        'line-height': '36px',
        position: 'absolute',
        top: '24px',
        left: '28px',
        /* Font */
        color: '#222',
        'font-family': 'Noto Sans TC',
        'font-style': 'normal',
        'font-weight': '500',
        'font-size': '24px',
        'letter-spacing': '0.0357143em',        
    },
    regionInfo: {
        boxSizing: 'border-box',
        position: 'absolute',
        top: `${68-5}px`,//74-5
        left: `${29-12}px`,
    },
    regionInfoCellRow: {
        fontSize: 0,
    },
    regionInfoCell: {
        boxSizing: 'border-box',
        'width': '11px',
        'height': '5px',
        'border-radius': '2px',
        marginTop: '5px',
        marginLeft: '12px',
        display: 'inline-block',
    },
});
const mobileStyle = makeStyles({
    regionInfoCell: {
    },
    listItemWrapper: {
    },
    listItem: {
        padding: '20px',
    },
    regionName: {     
    },
    listItemContainer: {
    },
    listItemContainerMeasureWrapper: {
    },
    listItemContainerMeasure: {
    },
});

const RegionInfoRow = (props?: any) => {
    const { classes, columnNum, rowIndex, rowData } = props;
    const cells = [];
    const exsitingPartyButColorNotFound = '#AEAEAE';

    for (let i = 0; i < columnNum; i++) {
        const partyName: string = rowData[i];

        const cellStyle: React.CSSProperties = (function() {
            if (partyName) {
                const partyColor = PartyColorLookup[partyName];
                const backgroundColor = partyColor !== undefined ? partyColor['main'] : exsitingPartyButColorNotFound;
                const existingPartyStyle: React.CSSProperties = { background: backgroundColor };

                return existingPartyStyle;
            } else {
                const emptyPartyStyle: React.CSSProperties = {  visibility: 'hidden' };
                return emptyPartyStyle;
            }
        })();
        
        cells.push(
            <div style={cellStyle} className={classes.regionInfoCell} key={`row-${rowIndex}-column-${i}`}></div>
        );
    }

    return (
        <>
            {cells}
        </>
    );
};

const RegionInfo = (props?: any) => {
    const { classes, infoData } = props;
    const columnNum = infoData.length;
    const rowNum =  Math.max.apply(Math,infoData.map((d: any) => d['party'].length));

    const rows = [];
    const sortedInfoData = sortDistrict(infoData);

    for (let i = 0; i < rowNum; i++) {
        const rowData = sortedInfoData.map((d: any) => d['party'][i]);

        const rowStyle = (i !== 0) ? {} : { marginBottom: '4px' };

        rows.push(
            <div style={rowStyle} className={classes.regionInfoCellRow} key={`row-${i}`}>
                <RegionInfoRow rowData={rowData} columnNum={columnNum} rowIndex={i} classes={classes}></RegionInfoRow>
            </div>
        );
    }

    
    return (
        <div className={classes.regionInfo}>
            {rows}
        </div>
    );
}

const counties = countyConstituency.map(county => county.name);

interface regionInfoDataInterface {
    [regionName: string]: [{
        name: string;
        party: [string];
    }]
}

const defaultRegionInfoData: regionInfoDataInterface = {
    "臺南市":[{name: '', party: ['']}],
    "彰化縣":[{name: '', party: ['']}],
    "山地原":[{name: '', party: ['']}],
    "新北市":[{name: '', party: ['']}],
    "臺中市":[{name: '', party: ['']}],
    "臺北市":[{name: '', party: ['']}],
    "桃園市":[{name: '', party: ['']}],
    "高雄市":[{name: '', party: ['']}],
    "嘉義市":[{name: '', party: ['']}],
    "新竹縣":[{name: '', party: ['']}],
    "新竹市":[{name: '', party: ['']}],
    "苗栗縣":[{name: '', party: ['']}],
    "南投縣":[{name: '', party: ['']}],
    "屏東縣":[{name: '', party: ['']}],
    "嘉義縣":[{name: '', party: ['']}],
    "連江縣":[{name: '', party: ['']}],
    "宜蘭縣":[{name: '', party: ['']}],
    "平地原":[{name: '', party: ['']}],
    "澎湖縣":[{name: '', party: ['']}],
    "金門縣":[{name: '', party: ['']}],
    "雲林縣":[{name: '', party: ['']}],
    "臺東縣":[{name: '', party: ['']}],
    "基隆市":[{name: '', party: ['']}],
    "花蓮縣":[{name: '', party: ['']}],
};

type BreakpointOrNull = Breakpoint | null;

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
function useWidth() {
  // from https://material-ui.com/zh/components/use-media-query/#%E8%BF%81%E5%BE%99%E8%87%AA-withwidth
  const theme: Theme = useTheme();
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

function useListItemContainerWidth() {
    const [ width, setWidth ] = useState<string | null>(`0px`);
    const ref = useCallback(node => {
        if (node !== null) {
            setWidth(node.offsetWidth);
        }
    // will trigger re-check of node's with for different width breakspoint set by Material UI
    }, [useWidth()]);

    return [width, ref];
};

const Constituency = () => {
    const isDesktop = useMediaQuery('(min-width:769px)');
    const useStyles = isDesktop ? desktopStyle : mobileStyle;
    const classes = useStyles();
    
    // prepare to get data for regions
    const regionInfoDataUrl =`/api/data/countyParties.json`;
    // function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
    const [regionInfoData, setRegionInfoData] = useState<regionInfoDataInterface>(defaultRegionInfoData);

    useEffect(() => {
        // get web data for regions
        fetch(regionInfoDataUrl)
            .then(res => res.json())
            .then(resJson => setRegionInfoData(resJson));
    // only fetch data once on mount
    }, [regionInfoDataUrl]);

    const [listItemContainerWidth, refListItemContainerMeasure] = useListItemContainerWidth();
            
    // define the max number of regions in a row to display
    const maxNumInOneRow = 3;

    return (
        <Container className="p-0">
            <Navigation title="區域立委候選人">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Typography variant="h4" color="textSecondary">
                        所有縣市
                    </Typography>
                </Breadcrumbs>
            </Navigation>
            <List className={classes.listItemWrapper}>
                {isDesktop && <div className={classes.listItemContainerMeasureWrapper}>
                    <div ref={refListItemContainerMeasure} className={classes.listItemContainerMeasure}>
                        {(() => {
                            const fakeBlocks: any = [];
                            for(let i = 0; i < maxNumInOneRow; i++) {
                                fakeBlocks.push(
                                    <ListItem
                                        key={`fakeBlocks-${i}`}
                                        button
                                        component="a"
                                        divider={true}
                                        className={classes.listItem}
                                    >
                                    </ListItem>
                                );
                            }

                            return (
                                <>
                                    {fakeBlocks}
                                </>
                            )
                        })()}
                    </div>
                </div>}
                <div style={{width: `${listItemContainerWidth}px`}} className={classes.listItemContainer}>
                    {counties.map(county => (
                        <ListItem
                            key={county}
                            button
                            component="a"
                            href={`/regional/${county}`}
                            divider={true}
                            className={classes.listItem}
                        >
                            <ListItemText className={classes.regionName} primary={county}></ListItemText>
                            {isDesktop 
                                && regionInfoData[county] 
                                && (regionInfoData[county][0]['party'][0] !== '')
                                && <RegionInfo classes={classes} infoData={regionInfoData[county]} />}
                        </ListItem>
                    ))}
                </div>
            </List>
        </Container>
    );
};

export default Constituency;
