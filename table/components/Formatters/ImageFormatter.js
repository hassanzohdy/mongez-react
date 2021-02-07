import 'reinforcements';
import React from 'react';
import 'sprintf-js';
import '../../../localization/locales.js';
import '@flk/supportive-is';
import { styled } from '@material-ui/core';
import '../../../components/Link.js';
import '../../../components/Modal.js';
import Image from '../../../components/Image.js';
import '../../../components/Chart.js';
import Avatar from '../../../components/Avatar.js';
import '../../../components/Tabs.js';
import '../../../form/Context/FormContext.js';
import '../../../components/Confirm.js';
import 'react-timeago';
import '../../../components/Tooltip.js';
import '../../../components/ScrollTo.js';
import '../../../components/Redirect.js';
import '../../../components/Accordion.js';
import '../../../components/ColoredIcon.js';
import 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import '@material-ui/icons/AddCircle';
import '../../../components/Preloaders/Spinner/index.js';
import '../../../components/ColoredButton.js';
import '@material-ui/icons/Delete';
import '../../../components/LabelledOutline.js';
import '../../../components/Condition.js';
import '../../../components/Grid/GridItemCheckBoxContainer.js';
import '../../../components/Badge.js';

const Wrapper = styled('div')({
    margin: 'auto',
});
function ImageFormatter({ column }) {
    let { value: imageSrc, theme = 'avatar' } = column;
    if (!imageSrc)
        return null;
    let image;
    if (theme === 'avatar') {
        image = React.createElement(Avatar, { src: imageSrc });
    }
    else if (theme === 'thumbnail') {
        image = React.createElement(Image, { src: imageSrc });
    }
    return React.createElement(Wrapper, null, image);
}

export default ImageFormatter;
