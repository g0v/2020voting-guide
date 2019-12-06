import { Box, Link, Typography } from '@material-ui/core';
import React from 'react';
import Alert from '../Alert';
import AdCard from './AdCard';

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

const StrengthTab = ({
    constituency,
    name
}: {
    constituency: string;
    name: string;
}) => {
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

    return (
        <Box bgcolor="#F9F9F9" py={1}>
            <Alert>
                <Typography variant="h5" color="textSecondary">
                    以下是此候選人在競選期間的收支狀況與宣傳手法。
                </Typography>
                <Typography variant="h5" color="textSecondary">
                    {"資料來源: "}
                    <Link href="https://www.facebook.com/ads/library">
                        <u>Facebook Ad Library</u>
                    </Link>
                </Typography>
            </Alert>
            <Box display="flex" alignItems="center" mx={1.5} pt={3}>
                <Box
                    width="8px"
                    height="24px"
                    mr={1}
                    borderRadius="4px"
                    bgcolor="primary.main"
                />
                <Typography variant="h2">FB 粉專廣告投放</Typography>
            </Box>
            <Box display="flex" mb={3} mt={1}>
                <Box ml={3.5} />
                <Typography variant="h5" color="textSecondary">
                    候選人在臉書粉絲團上的花費及廣告內容
                </Typography>
            </Box>
            <Box textAlign="center" maxHeight={130}>
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
            <Box px={1} pb={1}>
                {ads.map((ad: AD) => (
                    <AdCard {...ad} />
                ))}
            </Box>
        </Box>
    );
};

export default StrengthTab;
