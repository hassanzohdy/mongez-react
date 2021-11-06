import React from 'react';
import PropTypes from 'prop-types';
import { trans } from './../../localization';
import { toInputName } from 'reinforcements';
import { DISABLE_INPUT_CHANGE } from '../utils/flags';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HiddenInput from './HiddenInput';
import config from '../../config';

export type CheckboxProps =  {
    checked?: boolean;
    readOnly?: boolean;
    onChange?(checked: boolean, value: string, e: any);
    defaultChecked?: boolean;
    labelClasses?: Object;
    uncheckedValue?: any;
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
    [id: string]: any;
}

export default function withCheckbox(WrappedCheckboxComponent): React.FC {
    const Checkbox = React.forwardRef(function (props: CheckboxProps, ref) {
        const { label, defaultChecked, labelPlacement = 'end',
            labelClasses = {}, readOnly, uncheckedValue = config.get('form.checkbox.uncheckedValue', 0), checked: inputChecked, name = '', value = 1,
            onChange, ...otherProps } = props;

        const [checked, setChecked] = React.useState(() => {
            if (defaultChecked !== undefined) return Boolean(defaultChecked);

            if (![null, undefined].includes(inputChecked)) return Boolean(inputChecked);

            return false;
        });

        const handleChange = e => {
            const newInputCheckedState = e.target.checked;

            if (readOnly) return;

            const output: any = onChange(newInputCheckedState, e.target.value, e);

            // disable input update if the event of onChange returns -1 
            if (output === DISABLE_INPUT_CHANGE) return;

            setChecked(newInputCheckedState);
        };

        const CheckboxReturnWrapper = ({ children }) => {
            if ([undefined, null, ''].includes(uncheckedValue)) return children;

            return (
                <>
                    {!checked && <HiddenInput name={toInputName(name)} value={uncheckedValue} />}
                    {children}
                </>
            )
        };

        React.useEffect(() => {
            if (inputChecked === undefined) return;

            if (Boolean(inputChecked) === checked) return;

            setChecked(Boolean(inputChecked));

        }, [inputChecked]);

        const checkboxInput = (
            <CheckboxReturnWrapper>
                <WrappedCheckboxComponent name={toInputName(name)} value={value} color="primary" {...otherProps} checked={checked} onChange={handleChange} />
            </CheckboxReturnWrapper>
        );

        if (!label) {
            return checkboxInput;
        }

        return (
            <FormControlLabel ref={ref} labelPlacement={labelPlacement} classes={labelClasses} control={checkboxInput} label={trans((label as string))} />
        )
    });

    Checkbox.propTypes = {
        label: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        defaultChecked: PropTypes.bool,
        checked: PropTypes.bool,
        readOnly: PropTypes.bool,
    }

    Checkbox.defaultProps = {
        onChange: () => { },
    }

    return Checkbox;
}