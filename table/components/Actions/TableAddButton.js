import { Obj } from 'reinforcements';
import React from 'react';
import '../../../localization/locales.js';
import { trans } from '../../../localization/translator.js';
import Is from '@flk/supportive-is';
import '@material-ui/core';
import '../../../components/Link.js';
import IconButton from '@material-ui/core/IconButton';
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
import ColoredIcon from '../../../components/ColoredIcon.js';
import 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import '../../../components/Preloaders/Spinner/index.js';
import '../../../components/ColoredButton.js';
import '@material-ui/icons/Delete';
import '../../../components/LabelledOutline.js';
import '../../../components/Condition.js';
import '../../../components/Grid/GridItemCheckBoxContainer.js';
import '../../../components/Badge.js';
import useTable from '../../hooks/use-table.js';
import TableForm from '../TableForm.js';

const defaultButtonOptions = {
    tooltip: trans('add'),
    icon: {
        color: 'primary',
        fontSize: 'large',
    }
};
function TableAddButton(props) {
    const [formIsOpened, openForm] = React.useState(false);
    const { service, options, updateRecords } = useTable();
    if (!options.haveAccessTo('add'))
        return null;
    const formOptions = props.formOptions || options.formOptions || {};
    if (!formOptions.modalOptions) {
        formOptions.modalOptions = props.modalOptions || {};
    }
    const { defaultData = { published: true } } = formOptions;
    const buttonOptions = Obj.merge(defaultButtonOptions, props.buttonOptions || {});
    const onSubmit = record => {
        updateRecords(tableRecords => {
            tableRecords.unshift(record);
            return [...tableRecords];
        });
        openForm(false);
    };
    if (Is.empty(formOptions))
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement(IconButton, { onClick: e => openForm(true) },
            React.createElement(Tooltip, { title: buttonOptions.tooltip },
                React.createElement(ColoredIcon, { icon: AddCircleIcon, color: buttonOptions.icon.color, fontSize: buttonOptions.icon.fontSize }))),
        React.createElement(TableForm, { onSubmit: onSubmit, open: formIsOpened, onClose: e => openForm(false), service: service, action: "add", record: defaultData, formOptions: formOptions })));
}

export default TableAddButton;
