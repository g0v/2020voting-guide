import { Box, Typography } from '@material-ui/core';
import React from 'react';
import ads from '../../data/ad_static.json';
import Card from '../Card';

const candidateFBDefault = {
    name: '',
    fbPage: ''
};

const BasicInfoTab = ({
    name,
    constituency
}: {
    name: string;
    constituency: string;
}) => {
    const width = window.screen.width > 425 ? 425 : window.screen.width;

    const candidateAds = ads.filter(
        ad => ad.constituency === constituency && ad.name === name
    );
    console.log(candidateAds);

    const [candidateFB, setCandidateFB] = React.useState(candidateFBDefault);
    React.useEffect(() => {
        fetch(`/api/fb/${constituency}/${name}`)
            .then(res => res.json())
            .then(setCandidateFB);
    }, [name]);

    const [ad, setAd] = React.useState([]);
    React.useEffect(() => {
        fetch(`/api/ad/${constituency}/${name}`)
            .then(res => res.json())
            .then(setCandidateFB);
    }, [name]);

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
            {candidateAds.map(ad => (
                <Card>
                    <Typography variant="h5">{ad.content.split(' ').map(line=> (<>{line}<br /></>))}</Typography>
                </Card>
            ))}
        </Box>
    );
};

export default BasicInfoTab;
