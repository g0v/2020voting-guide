import { Box, Button, DialogContent, Typography } from '@material-ui/core';
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
        const adLines = fullText.search('\n')
            ? fullText.split('\n')
            : fullText.split(/ (?![a-zA-Z])/);

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
                <Box maxWidth="100%">
                    <img src={pic} width="100%" />
                </Box>
                {generateCardTextHtml(content)}
            </DialogContent>
            <Box
                position="absolute"
                display="flex"
                justifyContent="flex-end"
                bottom="0"
                py={2}
                height={40}
                width="100%"
            >
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClose}
                >
                    關閉
                </Button>
                <Box width={20} />
            </Box>
        </Dialog>
    );
};

export default AdDialog;
