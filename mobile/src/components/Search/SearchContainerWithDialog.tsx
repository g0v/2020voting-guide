import { Dialog, DialogContent } from '@material-ui/core';
import React from 'react';
import SearchContainer from './SearchContainer';
import { Callback } from './types';

type SearchContainerWithDialogProps = {
    open: boolean;
    onClose?: Callback;
};

const SearchContainerWithDialog = ({
    open,
    onClose
}: SearchContainerWithDialogProps) => {
    return (
        <Dialog open={open} fullWidth maxWidth={'lg'} onClose={onClose}>
            <DialogContent>
                <SearchContainer />
            </DialogContent>
        </Dialog>
    );
};

export default SearchContainerWithDialog;
