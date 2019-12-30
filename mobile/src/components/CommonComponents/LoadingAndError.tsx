import React from 'react';
import { Typography } from '@material-ui/core';
import Loading from './Loading';

type Props = {
    loading: boolean;
    error: any;
};
const LoadingAndError = ({ loading, error }: Props) => {
    if (loading) return <Loading />;
    if (error) return <Typography>{error}</Typography>;
    return <></>;
};

export default LoadingAndError;
