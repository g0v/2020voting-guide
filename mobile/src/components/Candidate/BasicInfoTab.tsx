import { Box } from '@material-ui/core';
import React from 'react';

const candidateFBDefault = {
    name: '',
    fbPage: ''
};

const BasicInfoTab = ({ name }: { name: string }) => {
    const width = window.screen.width > 425 ? 425 : window.screen.width;
    const [candidateFB, setCandidateFB] = React.useState(candidateFBDefault);
    React.useEffect(() => {
        fetch(`/api/fb/${name}`)
            .then(res => res.json())
            .then(setCandidateFB);
    }, [name]);
    console.log(candidateFB);

    return (
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
            ></iframe>
        </Box>
    );
};

export default BasicInfoTab;
