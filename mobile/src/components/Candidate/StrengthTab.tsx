import { Box } from '@material-ui/core';
import React from 'react';
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
        <Box bgcolor="#F7F7F7">
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
            <Box p={1}>
                {ads.map((ad: AD) => (
                    <AdCard {...ad} />
                ))}
            </Box>
        </Box>
    );
};

export default StrengthTab;
