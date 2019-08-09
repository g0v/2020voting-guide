import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import countyConstituency from './county_constituency.json';

const counties = countyConstituency.map(county => county.name);
const Constituency = () => {
    return (
        <>
            <Box my={2} mx={1}>
                <Typography variant="h6">選擇選區</Typography>
            </Box>
            {counties.map(county => (
                <div key={county}>
                    <Button href={`/regional/${county}`} size="large" fullWidth>
                        <Typography variant="button">{county}</Typography>
                    </Button>
                    <Divider />
                </div>
            ))}
        </>
    );
};

export default Constituency;
