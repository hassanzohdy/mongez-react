import React from 'react';
import config from '../../config';
import FileInput from './FileInput';
import StaticButton from './StaticButton';
import { IconButton, styled } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { If } from '../../components/Condition';
import { ColoredIcon, Tooltip } from '../../components';
import { trans } from '../../localization';

import DeleteIcon from '@material-ui/icons/Delete';

const imagePlaceholder = config.get('form.imageInput.placeholder', 'https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png');

const Image = styled('img')(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
}));

const ImageButton = styled(StaticButton)({
    background: grey[200],
});

const acceptedExtensions: string[] = [
    'jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'ico'
];

export type ImageInputProps = {
    /**
     * Determine if it is required
     */
    required?: boolean;
    /**
     * Image width
     */
    height?: number;
    /**
     * Image height
     */
    width?: number;
    /**
     * General Image style
     */
    imageStyle?: React.CSSProperties;
    /**
     * Determine whether the image is clearable
     */
    clearable?: boolean;
    /**
     * Clear button component, works only when required prop is not set to true
     */
    clearButton?: React.ReactNode;
    /**
     * Clear button position, works only when required prop is not set to true
     */
    clearButtonPosition?: 'top' | 'left' | 'right' | 'bottom';
    /**
     * Any other props are passed to file input component
     */
    [prop: string]: any;
};

export default function ImageInput({ clearable = null, required = false, clearButton = null, clearButtonPosition = 'bottom', height = null, width = null, name = '', imageStyle = {}, ...props }) {
    const [selectedImage, selectImage] = React.useState(props.value || props.defaultValue || imagePlaceholder);
    const [displayingImage, displayImage] = React.useState(selectedImage);

    if (height) {
        (imageStyle as React.CSSProperties).height = height;
    }

    if (width) {
        (imageStyle as React.CSSProperties).width = width;
    }

    const ButtonComponent = componentProps => {
        return <ImageButton {...componentProps}>
            <Image style={imageStyle} src={displayingImage} />
        </ImageButton>
    };

    const onFileSelection = e => {
        const image = URL.createObjectURL(e.target.files[0]);
        selectImage(image);
        displayImage(image);

        props.onChange && props.onChange(image);
    };

    const clearImage = () => {
        selectImage(false);
        displayImage(imagePlaceholder);
    }

    const imageFileInput = <FileInput
        {...props}
        value={selectedImage === imagePlaceholder ? null : selectedImage}
        required={required}
        name={name}
        accept={acceptedExtensions}
        onChange={onFileSelection}
        buttonComponent={ButtonComponent}
    />

    if (required === true) {
        return imageFileInput;
    }

    return (
        <>
            {imageFileInput}
            <If condition={Boolean(clearButtonPosition === 'bottom' && (selectedImage && selectedImage !== imagePlaceholder) && clearable !== false)}>
                <Tooltip title={trans('remove')}>
                    <IconButton onClick={clearImage}>
                        <ColoredIcon icon={DeleteIcon} color={'#F00'} />
                    </IconButton>
                </Tooltip>
            </If>
        </>
    );
}