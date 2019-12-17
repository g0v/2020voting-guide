import { Box, DialogContent, Typography } from '@material-ui/core';
import React from 'react';
import Dialog from '../Dialog';

const AdDialog = ({
    pic,
    content,
    startDate,
    endDate,
    handleClose
}: {
    pic: string;
    content: string;
    startDate: string;
    endDate: string;
    open: boolean;
    handleClose: () => void;
}) => {
    const generateCardTextHtml = (fullText: string) => {
        const adLines =
            fullText.search('\n') === -1
                ? fullText.split(/ (?![a-zA-Z])/)
                : fullText.split('\n');
        return (
            <>
                {adLines.slice(0, 1).map(title => (
                    <Typography variant="h3" gutterBottom>
                        {title}
                    </Typography>
                ))}
                <Typography variant="h5" color="textSecondary">
                    {adLines.slice(1).map(title => (
                        <>
                            {title}
                            <br />
                        </>
                    ))}
                </Typography>
            </>
        );
    };

    return (
        <Dialog>
            <DialogContent>
                <Box maxWidth="100%" style={{ textAlign: 'center' }}>
                    <img
                        src={pic}
                        alt="ad pic"
                        width="100%"
                        style={{ maxWidth: '500px' }}
                    />
                </Box>
                {generateCardTextHtml(content)}
                <Box height={72} />
            </DialogContent>
        </Dialog>
    );
};

export default AdDialog;
