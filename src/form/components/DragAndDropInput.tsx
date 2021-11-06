import clsx from 'clsx';
import React from 'react';
import { useOnce } from './../../hooks';
import { useDropzone } from 'react-dropzone';
import { ElseIf, If } from './../../components';
import { CloudUpload } from '@material-ui/icons'
import { Box, Button, styled } from '@material-ui/core';

const Label = styled('span')({
    marginLeft: '0.6rem',
    verticalAlign: 'super',
});

const AttachButton = styled(Button)({
    width: '100%',
    display: 'block',
    height: '100%',
});

const Wrapper = styled('div')({
    padding: '0.1rem',
    border: '2px dashed #ccc',
});

const HiddenInput = styled('input')({
    display: 'none',
});

const DraggableWrapper = styled('div')({
    padding: '1.5rem 1rem',
    color: '#ccc',
});

export type DragAndDropInputProps = {
    onChange: Function;
    classes?: {
        root?: string;
    }
}

export default function DragAndDropInput({ onChange, classes = {} }: DragAndDropInputProps) {
    const fileUploadRef = React.useRef();

    const openFileBrowser = e => {
        if (fileUploadRef.current) {
            (fileUploadRef as any).current.click();
        }
    };

    const onDrop = React.useCallback(acceptedFiles => {
        // Do something with the files
        onChange(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    // useOnce(() => {
    //     const fileInput = fileUploadRef.current as HTMLInputElement;

    //     fileInput.addEventListener('change', (e: any) => {
    //         onDrop(e.target.files);
    //     });
    // });

    return (
        <Wrapper {...getRootProps()} className={clsx(classes.root)}>
            <HiddenInput {...getInputProps()} type="file" ref={fileUploadRef} />
            <AttachButton onClick={openFileBrowser}>
                <If condition={isDragActive}>
                    <DraggableWrapper>Drop Here Your Files Here</DraggableWrapper>
                </If>
                <ElseIf condition={!isDragActive}>
                    <Box p={1}>
                        <CloudUpload />
                        <Label>
                            Drop files here or click to upload
                        </Label>
                    </Box>
                </ElseIf>
            </AttachButton>
        </Wrapper>
    )
}