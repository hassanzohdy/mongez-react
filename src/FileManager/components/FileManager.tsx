import React from 'react';
import config from '../../config';
import { trans } from '../../localization';
import { FileManagerWrapper } from './Helpers';
import { Box, makeStyles } from '@material-ui/core';
import { Modal, ProgressBar } from '../../components';
import selectFilesFormatter from './selectFilesFormatter';
import fileManagerService from '../services/file-manager-service';
import FileManagerProvider from '../providers/FileManagerProvider';
import { CrudOptions, tableActions, wizardTable } from '../../table';
import DragAndDropInput from '../../form/components/DragAndDropInput';
import FileFormatter from '../../table/components/Formatters/FileFormatter';
import { FileManagerProps, FileManagerModalProps, SelectedFile } from '../types';

const defaultModalProps: FileManagerModalProps = {
    size: 'lg',
    esc: true,
    backdrop: true,
    fullScreen: false,
};

const useStyle = makeStyles({
    modalTile: {
        backgroundColor: '#f1f1f1',
        padding: '6px 15px',
    },

    modalTitleCloseBtn: {
        top: 0,
    },
    dragAndDropRoot: {
        textAlign: 'center',
        height: 300,
    },
    notistack: {
        zIndex: 1000000,
    }
});

function getSettings(service, fileManagerText, props): CrudOptions {
    return {
        service,
        updateQueryString: false,
        resetFilterButton: false,
        permissions: {
            delete: true,
            add: false,
            edit: false,
            view: false,
            list: true,
        },
        table: {
            heading: fileManagerText,
            filter: [
                {
                    col: 6,
                    name: 'name',
                    placeholder: 'search',
                    type: 'search',
                }
            ],
            columns: [
                {
                    heading: '#',
                    key: 'id',
                },
                {
                    heading: 'file',
                    key: 'url',
                    formatter: FileFormatter,
                },
                {
                    heading: 'fileName',
                    key: 'fileName',
                },
                {
                    heading: 'title',
                    key: 'title',
                },
                {
                    heading: 'directory',
                    key: 'directory',
                },
                {
                    heading: 'created',
                    key: 'createdAt.humanTime',
                },
                {
                    heading: 'select',
                    key: '',
                    formatter: selectFilesFormatter(props),
                },
                tableActions,
            ]
        }
    }
}

let selectedFiles = [];

export default function FileManager(props: FileManagerProps) {
    const { modalProps = defaultModalProps, uploadName = config.get('fileManager.uploadName', 'uploads'), service = config.get('fileManager.service', fileManagerService), open, title } = props;
    const classes = useStyle();
    const [uploading, upload] = React.useState(false);

    const [tableProps, setTableProps] = React.useState({});

    const fileManagerText = trans('fileManager.title');

    const closeModal = () => {
        // if (props.multiple) {
        //     props.onSelect(selectedFiles);
        // }

        // reset selected file(s)
        selectedFiles = [];

        props.onClose();
    };

    const selectingFile = (file: SelectedFile, isSelected: boolean) => {
        if (props.multiple === true) {
            if (isSelected) {
                selectedFiles.splice(selectedFiles.findIndex(selectedFile => selectedFile.id === file.id), 1);
                props.onUnSelect(file);
            } else {
                props.onSelect(file);
                selectedFiles.push(file);
            }
        } else {
            props.onSelect(file);
            closeModal();
        }
    }

    const onSelectingFiles = files => {
        upload(true);

        const data = new FormData();

        for (const file of files) {
            data.append(uploadName + '[]', file);
        }

        data.append('directory', '');

        service.create(data).then((response) => {
            setTableProps({
                ...response.data
            });

        }).finally(() => {
            upload(false);
        });
    };

    const settings = getSettings(service, fileManagerText, props);

    return (
        <FileManagerProvider.Provider value={{ selectingFile, selectedFiles }}>
            <Modal
                open={open}
                onClose={closeModal}
                classes={{ modalTitle: classes.modalTile, modalTitleCloseBtn: classes.modalTitleCloseBtn }}
                title={title || fileManagerText}
                {...modalProps}
            >
                <FileManagerWrapper>
                    {uploading && <Box mb={2}><ProgressBar /></Box>}
                    <DragAndDropInput classes={{ root: classes.dragAndDropRoot }} onChange={onSelectingFiles} />
                    {wizardTable(settings)({ props: tableProps })}
                </FileManagerWrapper>
            </Modal>
        </FileManagerProvider.Provider>
    )
}