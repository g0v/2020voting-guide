import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Card from '../Card';
import AdDialog from './AdDialog';

const useStyles = makeStyles({
    content: {
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
    廣告詳情: {
        ad_creative_body: string;
        ad_creation_time: string;
        ad_creative_link_caption: string;
        ad_creative_link_description: string;
        ad_creative_link_title: string;
        ad_delivery_start_time: string;
        ad_delivery_stop_time: string;
        currency: string;
        demographic_distribution: string;
        impressions: {
            lower_bound: string;
            upper_bound: string;
        };
        spend: {
            lower_bound: string;
            upper_bound: string;
        };
    };
}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const detail = ad['廣告詳情'];
    const content = ad['廣告詳情'].ad_creative_body;
    const generateCardTextHtml = (fullText: string) => {
        const adLines = fullText.split('\n');

        return (
            <>
                {adLines.slice(0, 1).map(title => (
                    <Typography variant="h3">{title}</Typography>
                ))}
                <Box mb={1} className={classes.content}>
                    <Typography variant="h5" color="textSecondary">
                        {adLines.slice(1).map(title => (
                            <>
                                {title}
                                <br />
                            </>
                        ))}
                    </Typography>
                </Box>
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
                    <Box display="flex" mb={1}>
                        <Box
                            display="flex"
                            alignContent="center"
                            color="#D4AF37"
                        >
                            <img alt="money" src="/img/money.svg" />
                            <Box width={4} />
                            <Typography variant="h5">
                                花費：
                                {`${detail.spend['lower_bound']}-${detail.spend['upper_bound']} ${detail.currency}`}
                            </Typography>
                        </Box>
                        <Box width={16} />
                        <Box display="flex" alignContent="center">
                            <img alt="eye" src="/img/eye.svg" />
                            <Box width={4} />
                            <Typography variant="h5" color="textSecondary">
                                曝光次數：
                                {`${detail.impressions['lower_bound']}-${detail.impressions['upper_bound']}`}
                            </Typography>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="flex-start">
                        <Box flexGrow={1} mr={1} maxWidth="80%">
                            {generateCardTextHtml(content)}
                        </Box>
                        <Box>
                            <Box height={5} />
                            <div
                                className={classes.cardImg}
                                style={{
                                    backgroundImage: `url(${ad['圖片']})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    borderRadius: '5px'
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
                                alt="period"
                                src="/img/calendar.svg"
                                height="20px"
                                width="20px"
                            />
                        </Box>
                    </Box>
                    {open ? (
                        <AdDialog
                            pic={ad['圖片']}
                            content={content}
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
