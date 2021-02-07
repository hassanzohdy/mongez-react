import 'reinforcements';
import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import '@flk/supportive-is';
import '@material-ui/core';
import ProgressBar from '../../components/Preloaders/ProgressBar.js';
import '../../components/Link.js';
import 'prop-types';
import '../../components/Modal.js';
import 'material-ui-image';
import '../../components/Chart.js';
import '../../components/Avatar.js';
import '../../components/Tabs.js';
import '@material-ui/core/Button';
import '../../form/components/Label.js';
import '../../form/Context/FormContext.js';
import '../../form/components/FormInput.js';
import '../../components/Confirm.js';
import 'react-timeago';
import '../../components/Tooltip.js';
import '../../components/ScrollTo.js';
import '../../components/Redirect.js';
import '../../components/Accordion.js';
import '../../components/ColoredIcon.js';
import 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import '@material-ui/icons/AddCircle';
import '../../components/Preloaders/Spinner/index.js';
import '../../components/ColoredButton.js';
import '@material-ui/icons/Delete';
import '../../components/LabelledOutline.js';
import '../../components/Condition.js';
import '../../components/Grid/GridItemCheckBoxContainer.js';
import '../../components/Badge.js';
import '../../form/validation/locales/ar.js';
import '../../form/validation/locales/en.js';
import 'form-serialize';
import '@material-ui/core/FormControlLabel';
import '../../form/components/Checkbox.js';
import '../../form/components/TextInput.js';
import 'material-ui-chip-input';
import FormError from '../../form/components/FormError.js';
import '../../form/components/StaticButton.js';
import '../../form/components/FileInput.js';
import '@material-ui/core/CircularProgress';
import FormModal from '../../form/components/FormModal.js';
import '../../form/components/ImageInput.js';
import '../../form/components/EmailInput.js';
import 'material-ui-color';
import '../../form/components/SelectInput.js';
import '../../form/components/AutoComplete.js';
import '../../form/components/TextAreaInput.js';
import '../../form/components/PasswordInput.js';
import '../../form/components/CheckboxGroup.js';
import '../../form/components/RichTextInput.js';
import '../../form/components/MultiLingualInput.js';
import '../../form/components/SwitchButton.js';
import useTable from '../hooks/use-table.js';

function TableForm(props) {
    let { action, formOptions, onClose, recordIndex, open, onSubmit, service, record = {} } = props;
    const [lazyRecord, setLazyRecord] = React.useState({});
    const [error, setError] = React.useState(null);
    const itemType = action === 'edit' ? 'editItem' : 'addItem';
    const { records, updateRecords } = useTable();
    React.useEffect(() => {
        if (open && formOptions.lazyForm && record.id && !lazyRecord.id) {
            let request = formOptions.request || service.get.bind(service);
            request(record.id).then(({ data }) => {
                setLazyRecord(data.record);
            });
        }
    }, [formOptions, lazyRecord, record, service, open]);
    if (!open)
        return null;
    const submitForm = async (e, form) => {
        setError(null);
        try {
            const form = e.target;
            let savedRecord;
            if (action === 'edit') {
                let { data } = await service.update(record.id, form);
                let { record: responseRecord } = data;
                savedRecord = responseRecord;
            }
            else {
                // action here is adding
                let { data } = await service.create(form);
                let { record: responseRecord } = data;
                savedRecord = responseRecord;
            }
            onSubmit && onSubmit(savedRecord, action);
            formOptions.onSave && formOptions.onSave(savedRecord, record, recordIndex, updateRecords, records);
        }
        catch (responseError) {
            form.submitting(false);
            if (responseError.response && responseError.response.data) {
                const { errors, error } = responseError.response.data;
                setError(error || errors);
            }
        }
    };
    let content;
    if (formOptions.lazyForm) {
        if (!lazyRecord.id && record.id) {
            content = React.createElement("div", { style: { marginTop: '5rem', marginBottom: '5rem' } },
                React.createElement(ProgressBar, null));
        }
        else {
            content = React.createElement(formOptions.lazyForm, { index: recordIndex, record: lazyRecord });
        }
    }
    else {
        content = React.createElement(formOptions.form, { index: recordIndex, record: record });
    }
    const onModalClose = () => {
        setLazyRecord({}); // reset object
        onClose();
    };
    return (React.createElement(FormModal, Object.assign({ open: open, onSubmit: submitForm, title: trans(itemType, trans(formOptions.singleName)), onClose: onModalClose }, (formOptions.modalOptions || {})),
        React.createElement(FormError, { error: error }),
        content));
}

export default TableForm;
