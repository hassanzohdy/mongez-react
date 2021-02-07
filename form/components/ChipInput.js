import { rtrim } from 'reinforcements';
import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import '@flk/supportive-is';
import '@material-ui/core';
import For from '../../components/For.js';
import '../../components/Link.js';
import '../../components/Modal.js';
import 'material-ui-image';
import '../../components/Chart.js';
import '../../components/Avatar.js';
import '../../components/Tabs.js';
import '../Context/FormContext.js';
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
import HiddenInput from './HiddenInput.js';
import BaseChipInput from 'material-ui-chip-input';

function ChipInput(props) {
    const [values, setValue] = React.useState(props.value || []);
    const handleAddChip = chip => {
        const newValues = [...values, chip];
        setValue(newValues);
        props.onChange && props.onChange(newValues);
    };
    const handleDeleteChip = (chip, index) => {
        values.splice(index, 1);
        const newValues = [...values];
        setValue(newValues);
        props.onChange(newValues);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(For, { array: values, render: value => (React.createElement(HiddenInput, { name: rtrim(props.name, '[]') + '[]', value: value })) }),
        React.createElement(BaseChipInput, { fullWidth: true, margin: props.margin || 'normal', label: props.label, newChipKeys: ['Enter', ','], variant: "outlined", alwaysShowPlaceholder: true, placeholder: props.placeholder ? trans(props.placeholder) : '', value: values, onAdd: (chip) => handleAddChip(chip), onDelete: (chip, index) => handleDeleteChip(chip, index) })));
}

export default ChipInput;
