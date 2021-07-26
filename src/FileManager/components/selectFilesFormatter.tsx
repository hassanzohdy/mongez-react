import React from 'react'
import { trans } from '../../localization'
import { ColoredIcon, If } from '../../components'
import { IconButton } from '@material-ui/core'
import { Check, LibraryAddCheck } from '@material-ui/icons'
import { SelectedFile, FileManagerProps } from '../types';
import FileManagerProvider from '../providers/FileManagerProvider';
import { Alert } from '@material-ui/lab';
import { Portal, Snackbar } from '@material-ui/core';

export default function selectFilesFormatter(props: FileManagerProps) {
    return ({ record }) => {
        const { selectingFile, selectedFiles } = React.useContext(FileManagerProvider);

        const [isSelected, select] = React.useState(() => {
            if (props.multiple !== true) return false;

            return Boolean(selectedFiles.find(file => file.id === record.id));
        });

        const [showingSuccessSelect, showSuccessSelect] = React.useState(false);

        const selectFile = () => {
            const selectedFile: SelectedFile = {
                id: record.id,
                name: record.fileName,
                url: record.url,
                relativePath: record.path,
            };

            if (props.multiple) {
                showSuccessSelect(true);
            }

            select(!isSelected);
            
            selectingFile(selectedFile, isSelected);
        };

        const handleClose = () => showSuccessSelect(false);

        return (
            <>
                <Portal>
                    <Snackbar anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} open={showingSuccessSelect} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} variant="filled" severity="success">
                            {trans('fileManager.fileIsSelected')}
                        </Alert>
                    </Snackbar>
                </Portal>
                <If condition={isSelected === false}>
                    <IconButton onClick={selectFile}>
                        <ColoredIcon icon={LibraryAddCheck} title={trans('fileManager.selectFile')} />
                    </IconButton>
                </If>
                <If condition={isSelected === true}>
                    <IconButton onClick={selectFile}>
                        <ColoredIcon icon={Check} color="primary" title={trans('fileManager.selected')} />
                    </IconButton>
                </If>
            </>
        );
    };
}
