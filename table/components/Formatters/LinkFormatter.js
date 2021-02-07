import { Obj } from 'reinforcements';
import React from 'react';
import 'sprintf-js';
import '../../../localization/locales.js';
import '@flk/supportive-is';
import { styled } from '@material-ui/core';
import Link from '../../../components/Link.js';
import '../../../components/Modal.js';
import 'material-ui-image';
import '../../../components/Chart.js';
import '../../../components/Avatar.js';
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

const ColoredLink = styled(Link)({
    color: '#FFF',
    backgroundColor: '#54545e',
    borderRadius: '5px',
    padding: '0.1rem 0.5rem',
    fontWeight: 'bold',
});
function LinkFormatter({ record, column, children }) {
    let href = Obj.get(column, 'settings.href');
    let value = children || column.value;
    if (!href || !value)
        return null;
    let linkProps = Obj.get(column, 'settings', {});
    delete linkProps.href;
    return React.createElement(ColoredLink, Object.assign({ to: href(record, column) }, linkProps, { children: value }));
}

export default LinkFormatter;
