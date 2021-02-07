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
import Confirm from '../../../components/Confirm.js';
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
import DeleteIcon from '@material-ui/icons/DeleteSweep';

function TableDeleteButton({ record, rowIndex }) {
    const [confirming, setConfirm] = React.useState(false);
    const { service, options, updateRecords } = useTable();
    if (!options.haveAccessTo('delete'))
        return null;
    const removeRecord = e => {
        // update table records
        updateRecords(records => {
            records.splice(rowIndex, 1);
            return [...records];
        });
        // Remove from API
        service.delete(record.id);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(IconButton, { onClick: e => setConfirm(true) },
            React.createElement(Tooltip, { title: trans('remove') },
                React.createElement(DeleteIcon, null))),
        React.createElement(Confirm, { open: confirming, onClose: e => setConfirm(false), onConfirm: removeRecord, message: trans('removeText') })));
}

export default TableDeleteButton;
