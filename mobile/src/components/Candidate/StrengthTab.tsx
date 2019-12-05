import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Card from '../Card';

const candidateFBDefault = {
    name: '',
    fbPage: ''
};

interface AD {
    開始日期: string;
    結束日期: string;
    圖片: string;
    廣告內容: string;
}

const useStyles = makeStyles({
    content: {
        'line-height': '40px',
        display: '-webkit-box',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical'
    },
    cardImg: {
        width: '65px',
        height: '65px'
    }
});

const StrengthTab = ({
    constituency,
    name
}: {
    constituency: string;
    name: string;
}) => {
    const classes = useStyles();
    const width = window.screen.width > 425 ? 425 : window.screen.width;

    const [candidateFB, setCandidateFB] = React.useState(candidateFBDefault);
    React.useEffect(() => {
        fetch(`/api/fb/${constituency}/${name}`)
            .then(res => res.json())
            .then(setCandidateFB);
    }, [name]);

    const [ads, setAds] = React.useState([]);
    React.useEffect(() => {
        fetch(`/api/ad/${constituency}/${name}`)
            .then(res => res.json())
            .then(setAds);
    }, [name]);

    const generateCardTextHtml = (fullText: string) => {
        const adLines = fullText.split(/ (?![a-zA-Z])/);
        return (
            <>
                {adLines.slice(0, 1).map(title => (
                    <Typography variant="h3">{title}</Typography>
                ))}
                <div className={classes.content}>
                    <Typography variant="h5" color="textSecondary">
                        {adLines.slice(1).map(title => (
                            <>
                                {title}
                                <br />
                            </>
                        ))}
                    </Typography>
                </div>
            </>
        );
    };

    return (
        <Box bgcolor="#F7F7F7" p={1}>
            <Box textAlign="center">
                <iframe
                    src={
                        'https://www.facebook.com/plugins/page.php?' +
                        `href=${candidateFB.fbPage}` +
                        `&width=${width}&adapt_container_width=true` +
                        '&show_facepile=false&hide_cta=true'
                    }
                    width={width}
                    scrolling="no"
                    frameBorder="0"
                    allow="encrypted-media"
                />
            </Box>
            {ads.map((ad: AD) => (
                <Card>
                    <Box display="flex" justifyContent="flex-start">
                        <Box flexGrow={1}>
                            {generateCardTextHtml(ad['廣告內容'])}
                        </Box>
                        <Box>
                            <div
                                className={classes.cardImg}
                                style={{
                                    backgroundImage: `url(${ad['圖片']})`,
                                    backgroundPosition: "center"
                                }}
                            />
                        </Box>
                    </Box>
                    <Box mt={1} display="flex" flexDirection="row-reverse">
                        <Typography variant="h5" color="textSecondary">
                            {ad['開始日期'].split('-').join('/') +
                                '～' +
                                ad['結束日期'].split('-').join('/')}
                        </Typography>
                        <Box mx={1} display="inline-box">
                            <img
                                src="/img/calendar.svg"
                                height="20px"
                                width="20px"
                            />
                        </Box>
                    </Box>
                </Card>
            ))}
        </Box>
    );
};

export default StrengthTab;
