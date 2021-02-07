import config from '../../config/index.js';
import React from 'react';
import { styled } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import StaticButton from './StaticButton.js';
import FileInput from './FileInput.js';

const imagePlaceholder = config.get('form.imageInput.placeholder', 'https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png');
const Image = styled('img')(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
}));
const ImageButton = styled(StaticButton)({
    background: grey[200],
});
const acceptedExtensions = [
    'jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'ico'
];
function ImageInput(props) {
    const [selectedImage, selectImage] = React.useState(props.value || imagePlaceholder);
    const ButtonComponent = componentProps => {
        return React.createElement(ImageButton, Object.assign({}, componentProps),
            React.createElement(Image, { src: selectedImage }));
    };
    const onFileSelection = e => {
        selectImage(URL.createObjectURL(e.target.files[0]));
    };
    return React.createElement(FileInput, Object.assign({ accept: acceptedExtensions }, props, { onChange: onFileSelection, buttonComponent: ButtonComponent }));
}

export default ImageInput;
