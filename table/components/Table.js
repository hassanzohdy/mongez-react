import { Obj } from 'reinforcements';
import '../../router/router-history.js';
import React from 'react';
import 'sprintf-js';
import '../../localization/locales.js';
import '../../router/routes-list.js';
import '@flk/supportive-is';
import { updateQueryString } from '../../router/navigator.js';
import 'react-dom';
import 'react-router-dom';
import { styled } from '@material-ui/core';
import '../../router/renderer.js';
import '../../router/update-current-localization.js';
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
import { If } from '../../components/Condition.js';
import '../../components/Grid/GridItemCheckBoxContainer.js';
import '../../components/Badge.js';
import '../../form/validation/locales/ar.js';
import '../../form/validation/locales/en.js';
import Form from '../../form/components/Form.js';
import '@material-ui/core/FormControlLabel';
import '../../form/components/Checkbox.js';
import '../../form/components/TextInput.js';
import HiddenInput from '../../form/components/HiddenInput.js';
import 'material-ui-chip-input';
import '../../form/components/FormError.js';
import '../../form/components/StaticButton.js';
import '../../form/components/FileInput.js';
import '@material-ui/core/CircularProgress';
import '../../form/components/FormModal.js';
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
import TableContext from '../Context/TableContext.js';
import TableBody from './TableBody.js';
import TableHead from './TableHead.js';
import TableFilter from './TableFilter.js';
import TableToolBar from './TableToolBar.js';
import Paper from '@material-ui/core/Paper';
import TablePagination from './TablePagination.js';
import MaterialTable from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import { LightBackdrop } from '../../layout/components/Backdrop.js';

const TablePaper = styled(Paper)({
    position: 'relative',
});
function Table(props) {
    let { options, records, pagination: defaultPagination, isLoading: defaultIsLoading, onChange } = props;
    const [tableRecords, setRecords] = React.useState(records);
    const [currentTableInfo, setTableInfo] = React.useState({});
    const [pagination, setPaginationInfo] = React.useState(defaultPagination);
    const [isLoading, loading] = React.useState(defaultIsLoading);
    const formRef = React.useRef();
    const { service } = options;
    React.useEffect(() => {
        setRecords(records);
    }, [records]);
    React.useEffect(() => {
        loading(defaultIsLoading);
    }, [defaultIsLoading]);
    React.useEffect(() => {
        setPaginationInfo(defaultPagination);
    }, [defaultPagination]);
    const updateTableInfo = newInfo => {
        const newTableInfo = Obj.merge(currentTableInfo, newInfo);
        setTableInfo(newTableInfo);
        // onChange && onChange(newTableInfo);
        setTimeout(() => {
            formRef.current.submit();
        }, 0);
    };
    const setPageNumber = pageNumber => {
        updateTableInfo({
            page: pageNumber,
        });
    };
    const setItemsPerPage = itemsPerPage => {
        updateTableInfo({
            itemsPerPage,
            page: 1,
        });
    };
    const submitFilter = (e, form) => {
        loading(true);
        updateQueryString(form.toQueryString());
        service.list(form.toObject()).then(response => {
            setPaginationInfo(response.data.paginationInfo);
            setRecords(response.data.records);
            form.submitting(false);
            loading(false);
        });
    };
    const tableOptions = {
        options,
        pagination,
        setPageNumber,
        setPaginationInfo,
        setItemsPerPage,
        itemsPerPage: currentTableInfo.itemsPerPage,
        loading,
        records: tableRecords,
        updateRecords: setRecords,
        service: options.service,
    };
    return (React.createElement(TableContext.Provider, { value: tableOptions },
        React.createElement(TableToolBar, null),
        React.createElement(Form, { ref: formRef, className: "filterForm", onSubmit: submitFilter },
            React.createElement(TableFilter, null),
            React.createElement(TablePaper, null,
                React.createElement(LightBackdrop, { open: isLoading }),
                React.createElement(TableContainer, null,
                    React.createElement(MaterialTable, null,
                        React.createElement(TableHead, null),
                        React.createElement(TableBody, { isLoading: isLoading }))),
                React.createElement(If, { condition: Boolean(pagination) },
                    React.createElement(HiddenInput, { name: "page", value: currentTableInfo.page || 1 }),
                    React.createElement(HiddenInput, { name: "itemsPerPage", value: currentTableInfo.itemsPerPage }),
                    React.createElement(TablePagination, null))))));
}

export default Table;
