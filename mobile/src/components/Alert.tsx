import { useTheme, Box } from '@material-ui/core';
import React, { ReactNode } from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

interface Props {
    children?: ReactNode;
    className?: string;
}

const Alert = ({ children, className = '' }: Props) => {
    const theme = useTheme();
    return (
        <Box px={1.5} py={2} className={className}>
            <Box
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
        </Box>
    );
};
export default Alert;
