import 'reinforcements';
import React from 'react';
import '../../../localization/locales.js';
import { trans } from '../../../localization/translator.js';
import '@flk/supportive-is';
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
import TableForm from '../TableForm.js';
import EditIcon from '@material-ui/icons/Edit';
import useTableRow from '../../hooks/use-table-row.js';

function TableEditButton(props) {
    const [formIsOpened, openForm] = React.useState(false);
    const { service, options } = useTable();
    const { record, updateRecord } = useTableRow();
    if (!options.haveAccessTo('edit'))
        return null;
    const formOptions = props.formOptions || options.formOptions || {};
    if (!formOptions.modalOptions) {
        formOptions.modalOptions = props.modalOptions || {};
    }
    const onSubmit = record => {
        updateRecord(record);
        openForm(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(IconButton, { onClick: e => openForm(true) },
            React.createElement(Tooltip, { title: trans('edit') },
                React.createElement(EditIcon, null))),
        React.createElement(TableForm, { onSubmit: onSubmit, open: formIsOpened, onClose: e => openForm(false), service: service, action: "edit", record: record, formOptions: formOptions })));
}

export default TableEditButton;
