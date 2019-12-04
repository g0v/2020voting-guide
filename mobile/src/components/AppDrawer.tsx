import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import countyConstituency from '../data/county_constituency.json';
import React from 'react';
import { url } from 'inspector';

const drawerWidth = 315;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginRight: drawerWidth
        },
        title: {
            flexGrow: 1
        },
        hide: {
            display: 'none'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: drawerWidth
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            ...theme.mixins.toolbar,
            justifyContent: 'flex-start'
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            marginRight: -drawerWidth
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginRight: 0
        },
        countyListItem: {
            boxSizing: 'border-box',
            width: '33%',
            padding: '5px 15px 5px 15px',
            display: 'inline-block',
            color: '#3199BA'
        },
        listItemLink: {
            color: '#2584A3',
            marginBottom: '3px'
        },
        fbBlock: {
            display: 'flex',
            alignItems: 'center',
            color: '#666'
        },
        fbIcon: {
            display: 'inline-block',
            width: '31px',
            height: '31px',
            marginLeft: '8px',
            backgroundImage: 'url("/img/header/ic-fb.svg")'
        },
        aboutListItem: {
            color: '#666',
            display: 'inline-block'
        }
    })
);

interface AppDrawer {
    open: boolean;
    handleDrawerClose(): void;
}

const counties = countyConstituency.map(county => county.name);

const AppDrawer = ({ open, handleDrawerClose }: AppDrawer) => {
    const classes = useStyles();

    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronRightIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                <ListItem
                        button
                        key="區域立委候選人"
                        component="a"
                        href="/regional"
                        className={classes.listItemLink}
                    >
                        <Typography variant="h3">區域立委候選人</Typography>
                    </ListItem>
                {counties.map(county => (
                    <ListItem
                        key={county}
                        button
                        component="a"
                        href={`/regional/${county}`}
                        className={classes.countyListItem}
                    >
                        <ListItemText primary={county}></ListItemText>
                    </ListItem>
                ))}
                </List>
                <List>
                    <ListItem
                        button
                        key="立委工作內容 ＆ 投票規則"
                        component="a"
                        href="/"
                        className={classes.listItemLink}
                    >
                        <Typography variant="h3">立委工作內容 ＆ 投票規則</Typography>
                    </ListItem>
                    
                    {/*<ListItem button key="不分區立委參選政黨">
                        <ListItemText primary="不分區立委參選政黨" />
                    </ListItem>
                    <ListItem button key="熱門議題">
                        <ListItemText primary="熱門議題" />
                    </ListItem>*/}
                </List>
                <List>
                    <ListItem className={classes.fbBlock}>
                        <span>FOLLOW US →</span>
                        <a
                            href="https://www.facebook.com/voting.guide.tw/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className={classes.fbIcon}></span>
                        </a>
                    </ListItem>
                </List>
                <List>
                    <ListItem
                    button
                    component="a"
                    href="/about"
                    className={classes.aboutListItem}
                    >
                        <ListItemText primary="關於我們" />
                    </ListItem>
                    <ListItem
                    button
                    component="a"
                    target="_blank"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfc_MGy-ImXbukLWk-YsA3a96ZDf9etHF0TmSLPHPniTxaMxw/viewform"
                    className={classes.aboutListItem}
                    >
                        <ListItemText primary="問題回報" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};
export default AppDrawer;
