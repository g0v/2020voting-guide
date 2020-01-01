import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minHeight: 300,
        textAlign: 'center'
    }
});

type Props = {
    customResultTitle?: string;
};
const EmptySearchResult = ({ customResultTitle = '無搜尋結果' }: Props) => {
    const classes = useStyles();
    return (
        <Box
            className={classes.root}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Box>
                <img
                    src={'/img/doll/empty_fanpage.svg'}
                    alt={'you can search candidates and parties here'}
                />
                <Typography variant={'h4'}>{customResultTitle}</Typography>
            </Box>
        </Box>
    );
};

export default EmptySearchResult;
