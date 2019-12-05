import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Card from '../Card';
import AdDialog from './AdDialog';

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

const AdCard = (ad: {
    圖片: string;
    廣告內容: string;
    開始日期: string;
    結束日期: string;
}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const generateCardTextHtml = (fullText: string) => {
        const adLines = fullText.split(/ (?![a-zA-Z])/);
        return (
            <>
                {adLines.slice(0, 1).map(title => (
                    <Typography variant="h3" gutterBottom>
                        {title}
                    </Typography>
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
        <>
            <Card>
                <Box
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <Box display="flex" justifyContent="flex-start">
                        <Box flexGrow={1}>
                            {generateCardTextHtml(ad['廣告內容'])}
                        </Box>
                        <Box>
                            <div
                                className={classes.cardImg}
                                style={{
                                    backgroundImage: `url(${ad['圖片']})`,
                                    backgroundPosition: 'center'
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
                    {open ? (
                        <AdDialog
                            pic={ad['圖片']}
                            content={ad['廣告內容']}
                            startDate={ad['開始日期']}
                            endDate={ad['結束日期']}
                            open={open}
                            handleClose={() => {
                                setOpen(false);
                            }}
                        />
                    ) : null}
                </Box>
            </Card>
        </>
    );
};

export default AdCard;
