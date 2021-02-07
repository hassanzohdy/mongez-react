import { Obj } from 'reinforcements';
import React from 'react';
import 'sprintf-js';
import '../../../localization/locales.js';
import '@flk/supportive-is';
import '@material-ui/core';
import '../../../components/Link.js';
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
import ColoredIcon from '../../../components/ColoredIcon.js';
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
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function BooleanFormatter({ record, column }) {
    let value = Obj.get(record || {}, column.key, false);
    const { settings } = column;
    if (settings && settings.reversed) {
        value = !value;
    }
    if (value) {
        return React.createElement(ColoredIcon, { icon: CheckCircleIcon, color: "#47b947" });
    }
    return React.createElement(ColoredIcon, { icon: CancelIcon, color: "red" });
}

export default BooleanFormatter;
