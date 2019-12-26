import React from 'react';
import { Box, Link, Typography } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';
import Alert from '../Alert';

interface Props {
    name: string;
    constituency: string;
}
interface CandidateFB {
    name: string;
    fbPage: string;
}
export default function CandidateCompareCardFB({ name, constituency }: Props) {
    const { isLoading, responseData } = useFetch<CandidateFB>(
        `/api/fb/${constituency}/${name}`,
        {},
        [name]
    );

    let child = null;
    if (!isLoading) {
        if (!responseData.fbPage) {
            child = (
                <div className="candidate-compare-noinfo">
                    <Alert>
                        <Typography variant="h4" className="mb-2">
                            沒有粉專資料
                        </Typography>
                        <Typography variant="h5">
                            選前大補帖目前沒有找到此候選人的粉絲專頁
                        </Typography>
                    </Alert>
                </div>
            );
        } else {
            child = responseData.fbPage && (
                <iframe
                    className="iframe"
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
            );
        }
    }
    return (
        <div className="candidate-compare-col candidate-compare-fb">
            {child}
        </div>
    );
}
