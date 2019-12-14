import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

interface DeleteButtonProps {
    name: string;
    onDelete: (name: string) => void;
}

const DeleteButton = ({ name, onDelete }: DeleteButtonProps) => {
    const onClick = React.useCallback(() => {
        onDelete(name);
    }, []);
    return <CloseIcon onClick={onClick} />;
};

export default DeleteButton;
