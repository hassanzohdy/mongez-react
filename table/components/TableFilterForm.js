import { Obj } from 'reinforcements';
import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import '@flk/supportive-is';
import { navigateTo, currentRoute } from '../../router/navigator.js';
import { styled, Button } from '@material-ui/core';
import router from '../../router/index2.js';
import For from '../../components/For.js';
import '../../components/Link.js';
import 'prop-types';
import '../../components/Modal.js';
import 'material-ui-image';
import '../../components/Chart.js';
import '../../components/Avatar.js';
import '../../components/Tabs.js';
import '../../form/components/Label.js';
import '../../form/Context/FormContext.js';
import '../../form/components/FormInput.js';
import '../../components/Confirm.js';
import 'react-timeago';
import Tooltip from '../../components/Tooltip.js';
import '../../components/ScrollTo.js';
import '../../components/Redirect.js';
import '../../components/Accordion.js';
import ColoredIcon from '../../components/ColoredIcon.js';
import 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import '@material-ui/icons/AddCircle';
import '../../components/Preloaders/Spinner/index.js';
import '../../components/ColoredButton.js';
import '@material-ui/icons/Delete';
import '../../components/LabelledOutline.js';
import '../../components/Condition.js';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import '../../components/Grid/GridItemCheckBoxContainer.js';
import '../../components/Badge.js';
import '../../form/validation/locales/ar.js';
import '../../form/validation/locales/en.js';
import 'form-serialize';
import '@material-ui/core/FormControlLabel';
import '../../form/components/Checkbox.js';
import TextInput from '../../form/components/TextInput.js';
import 'material-ui-chip-input';
import '../../form/components/FormError.js';
import '../../form/components/StaticButton.js';
import '../../form/components/FileInput.js';
import SubmitButton from '../../form/components/SubmitButton.js';
import '../../form/components/FormModal.js';
import '../../form/components/ImageInput.js';
import '../../form/components/EmailInput.js';
import 'material-ui-color';
import SelectInput from '../../form/components/SelectInput.js';
import AutoComplete from '../../form/components/AutoComplete.js';
import '../../form/components/TextAreaInput.js';
import '../../form/components/PasswordInput.js';
import '../../form/components/CheckboxGroup.js';
import '../../form/components/RichTextInput.js';
import '../../form/components/MultiLingualInput.js';
import '../../form/components/SwitchButton.js';
import useTable from '../hooks/use-table.js';
import ReplayIcon from '@material-ui/icons/Replay';

const CircleButton = styled(Button)({});
const GridContainerWrapper = styled(GridContainer)({
    padding: '0.5rem 2.5rem',
});
const availableFilters = {
    search: {
        component: TextInput,
        defaultProps: {
            margin: 'dense',
            style: {
                marginTop: 0
            }
        }
    },
    select: {
        component: SelectInput,
        defaultProps: {
            margin: 'dense',
        }
    },
    autocomplete: {
        component: AutoComplete,
        defaultProps: {
            InputProps: {
                margin: 'dense',
                style: {
                    marginTop: 0
                }
            }
        }
    },
};
function TableFilterForm() {
    const { options } = useTable();
    const { filter } = options.table || {};
    const queryString = router.queryString;
    filter.forEach((singleFilter) => {
        if (!singleFilter.component && singleFilter.type) {
            singleFilter.component = availableFilters[singleFilter.type].component;
        }
        singleFilter.inputProps = Obj.merge({}, availableFilters[singleFilter.type].defaultProps || {}, singleFilter, singleFilter.inputProps);
        delete singleFilter.inputProps.inputProps;
        delete singleFilter.inputProps.component;
        delete singleFilter.inputProps.col;
        delete singleFilter.inputProps.type;
    });
    const resetForm = () => {
        navigateTo(currentRoute());
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(GridContainerWrapper, null,
            React.createElement(For, { array: filter, render: singleFilter => (React.createElement(GridItem, { xs: 12, sm: singleFilter.col },
                    React.createElement(singleFilter.component, Object.assign({}, singleFilter.inputProps, { value: singleFilter.value || queryString.get(singleFilter.query || singleFilter.name) })))) }),
            React.createElement(GridItem, { sm: 2 },
                React.createElement(SubmitButton, { color: "primary", variant: "contained" }, trans('table.filter')),
                React.createElement(Tooltip, { title: trans('table.reset') },
                    React.createElement(CircleButton, { onClick: resetForm },
                        React.createElement(ColoredIcon, { icon: ReplayIcon, color: "orange" })))))));
}

export default TableFilterForm;
