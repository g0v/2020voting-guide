import React from 'react';
import { Box, Link, Typography } from '@material-ui/core';

import useFetch from '../../hooks/useFetch';

interface Props {
    name: string;
    constituency: string;
}
interface CandidateFB {
    name: string;
    fbPage: string;
}
export default function CandidateCompareCardPayment({
    name,
    constituency
}: Props) {
    const { isLoading, responseData } = useFetch<CandidateFB>(
        `/api/fb/${constituency}/${name}`,
        {},
        [name]
    );

    if (isLoading) {
        return null;
    }
    return (
        <div className="candidate-compare-fb">
            <Box textAlign="center" maxHeight={130}>
                <iframe
                    src={
                        'https://www.facebook.com/plugins/page.php?' +
                        `href=${responseData.fbPage}` +
                        `&width=100&adapt_container_width=true` +
                        '&show_facepile=false&hide_cta=true'
                    }
                    title="fan page"
                    width="100"
                    scrolling="no"
                    frameBorder="0"
                    allow="encrypted-media"
                />
            </Box>
        </div>
    );
}
