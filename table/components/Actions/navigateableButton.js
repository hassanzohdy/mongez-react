import 'reinforcements';
import '../../../router/router-history.js';
import concatRoute from '../../../router/concat-route.js';
import React from 'react';
import '../../../localization/locales.js';
import { trans } from '../../../localization/translator.js';
import '../../../router/routes-list.js';
import '@flk/supportive-is';
import { currentRoute } from '../../../router/navigator.js';
import 'react-dom';
import 'react-router-dom';
import { IconButton } from '@material-ui/core';
import '../../../router/renderer.js';
import '../../../router/update-current-localization.js';
import Link from '../../../components/Link.js';
import '../../../components/Modal.js';
import 'material-ui-image';
import '../../../components/Chart.js';
import '../../../components/Avatar.js';
import '../../../components/Tabs.js';
import '../../../form/Context/FormContext.js';
import '../../../components/Confirm.js';
import 'react-timeago';
import Tooltip from '../../../components/Tooltip.js';
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
import useTable from '../../hooks/use-table.js';

function navigateableButton({ icon: Icon, navigateTo = null, permission = null, tooltip }) {
    return function (props) {
        const { record, column, ...otherProps } = props;
        const { options } = useTable();
        if (permission && !options.haveAccessTo(permission))
            return null;
        let path;
        if (column.navigateTo) {
            path = column.navigateTo(record, column);
        }
        else if (navigateTo) {
            path = navigateTo(record, column);
        }
        else {
            path = concatRoute(currentRoute(), record.id);
        }
        return (React.createElement(Tooltip, { title: trans(tooltip) },
            React.createElement(IconButton, { component: Link, to: path },
                React.createElement(Icon, null))));
    };
}

export default navigateableButton;
