import { toInputName } from 'reinforcements';
import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import PropTypes from 'prop-types';
import { DISABLE_INPUT_CHANGE } from '../utils/flags.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function withCheckbox(WrappedCheckboxComponent) {
    const Checkbox = React.forwardRef(function (props, ref) {
        const { label, defaultChecked, labelPlacement = 'end', labelClasses = {}, readOnly, checked: inputChecked, name = '', value = 1, onChange, ...otherProps } = props;
        const [checked, setChecked] = React.useState(() => {
            if (defaultChecked !== undefined)
                return Boolean(defaultChecked);
            if (![null, undefined].includes(inputChecked))
                return Boolean(inputChecked);
            return false;
        });
        const handleChange = e => {
            const newInputCheckedState = e.target.checked;
            if (readOnly)
                return;
            const output = onChange(newInputCheckedState, e.target.value, e);
            // disable input update if the event of onChange returns -1 
            if (output === DISABLE_INPUT_CHANGE)
                return;
            setChecked(newInputCheckedState);
        };
        React.useEffect(() => {
            if (inputChecked === undefined)
                return;
            if (Boolean(inputChecked) === checked)
                return;
            setChecked(Boolean(inputChecked));
        }, [inputChecked]);
        const checkboxInput = React.createElement(WrappedCheckboxComponent, Object.assign({ name: toInputName(name), value: value, color: "primary" }, otherProps, { checked: checked, onChange: handleChange }));
        if (!label) {
            return checkboxInput;
        }
        return (React.createElement(FormControlLabel, { ref: ref, labelPlacement: labelPlacement, classes: labelClasses, control: checkboxInput, label: trans(label) }));
    });
    Checkbox.propTypes = {
        label: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        defaultChecked: PropTypes.bool,
        checked: PropTypes.bool,
        readOnly: PropTypes.bool,
    };
    Checkbox.defaultProps = {
        onChange: () => { },
    };
    return Checkbox;
}

export default withCheckbox;
