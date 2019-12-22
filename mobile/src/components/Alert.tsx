import { useTheme, Box } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const Alert: FunctionComponent = ({ children }) => {
    const theme = useTheme();
    return (
        <Box
            mx={1.5}
            my={2}
            px={2.5}
            py={2}
            color={theme.palette.text.secondary}
            className="alert-frame"
        >
            <InfoOutlinedIcon
                fontSize="small"
                style={{
                    color: '#C4C4C4',
                    position: 'absolute',
                    top: '4px',
                    right: '4px'
                }}
            />
            {children}
        </Box>
    );
};
export default Alert;
