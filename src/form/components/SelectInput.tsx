import React from 'react';
import Label from './Label';
import Is from '@flk/supportive-is';
import config from './../../config';
import { Random } from 'reinforcements';
import { trans } from './../../localization';
import { toInputName } from 'reinforcements';
import { getItem, getItems } from '../utils/select-items';
import useFormInput from '../hooks/useFormInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { getLocalizedText } from '../../localization/utils';
import { Select, SelectProps as BaseSelectProps, FormHelperText, PropTypes } from '@material-ui/core';
import { selectItems, RenderSelectedValues } from './SelectInputHelpers';
import HiddenInput from './HiddenInput';

function defaultMapItem(item) {
    if (Is.string(item)) {
        item = {
            label: trans(item),
            value: item,
        }
    }
    else if (Is.numeric(item)) {
        item = {
            label: item,
            value: item,
        };
    } else if (Is.plainObject(item)) {
        let label = item.label || item.text || item.name || item.title;

        label = getLocalizedText(label);

        item = {
            ...item,
            label: label,
            value: item.value || item.id
        };
    }

    return item;
}

export type SelectProps = BaseSelectProps & {
    id?: string;
    label?: string;
    name?: string;
    groupBy?: string;
    classes?: any;
    fullWidth?: boolean;
    variant?: 'standard' | 'outlined' | 'filled';
    onChange?: any;
    lazyLoading?: boolean;
    request?: Function;
    mapResponse?: Function;
    labelId?: string;
    placeholder?: string;
    required?: boolean;
    value?: any;
    items?: any[];
    imagable?: boolean | string;
    iconable?: boolean;
    multiple?: boolean;
    margin?: any;
    readOnly?: boolean;
    mapItem?: Function;
    none?: boolean;
    disabled?: boolean;
    /**
     * A callback function triggered on validation error
     */
     onError?: (errorType: string, errorMessage: string) => void;
};

export default function SelectInput(props: SelectProps) {
    const defaultMapResponse = response => {
        return mapItems(response.data.records);
    };

    let { onError = null, id, label, name, groupBy, classes = {},
        mapItem = defaultMapItem, fullWidth = true,
        variant = config.get('form.input.variant', 'outlined'),
        margin = "normal", onChange,
        lazyLoading, request, mapResponse = defaultMapResponse,
        labelId, placeholder, required, value = '',
        items, imagable, iconable, multiple,
        readOnly, none, ...otherProps } = props;

    const mapItems = items => {
        return items ? items.map(mapItem) : [];
    };

    const [currentItems, setItems] = React.useState(mapItems(items || []));

    const [isLoading, setLoading] = React.useState(lazyLoading);

    const [loaded, requestIsLoaded] = React.useState(false);

    const adjustValue = value => {
        if (isLoading) return multiple ? [] : '';

        if ([null, undefined, ''].includes(value)) return multiple ? [] : '';

        if (Is.numeric(value) && !multiple) return Number(value);

        return value;
    };

    const [opened, setOpenedStatus] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [currentValue, setValue] = React.useState(adjustValue(value));
    // get the item object for the given value
    const componentRef = React.useRef(null);

    const hasError = Boolean(error);

    const formInput = useFormInput({
        name,
        value: currentValue,
        setError,
        onError,
        required,
    }, [currentValue]);

    const checkNoneItem = (() => {
        if (none && !currentItems.find(item => item.none)) {
            // add none 
            const noneItem = {
                value: '',
                label: trans('none'),
                none: true,
            };

            setItems([noneItem, ...currentItems]);
        }
    });

    const checkPlaceholder = () => {
        if (placeholder && currentItems && !currentItems.find(item => item.placeholder)) {
            const placeholderItem = {
                value: '',
                label: trans(placeholder),
                disabled: true,
                placeholder: true,
            };

            setItems([placeholderItem, ...currentItems]);
        }
    };

    React.useEffect(() => {
        if (Is.undefined(items)) return;

        setItems(mapItems(items));
        checkPlaceholder();
        checkNoneItem();
    }, [items]);

    React.useEffect(() => {
        if (value === null) return;

        setValue(adjustValue(value));
    }, [value]);

    React.useEffect(() => {
        if (!lazyLoading || loaded) return;

        request().then(response => {
            const items = mapResponse(response);

            checkPlaceholder();
            checkNoneItem();

            setItems(items);
            requestIsLoaded(true);
            setLoading(false);
            if (value !== null) {
                setValue(value || '');
            }
        });

    }, [lazyLoading, loaded, request, mapResponse, placeholder, value]);

    checkPlaceholder();
    checkNoneItem();

    const handleChange = (event, value2) => {
        let value = event.target.value;

        // select the item by value
        let item = multiple ? getItems(currentItems, value) : getItem(currentItems, value);

        if (multiple) {
            if (item.find(item => item.none === true)) {
                item = value = [];
            }
        } else if (item.none) {
            item = value = '';
        }

        setValue(value);

        // set the item as an argument for the onChange event 
        onChange && onChange(item, currentValue);

        formInput.requiredValue(value);
    };

    let formControlClass = classes.formControl;

    delete classes.formControl;

    const RenderHiddenInputs = () => {
        if (request && !loaded) return null;

        if (currentValue === undefined || currentValue === null) return null;

        if (!multiple) {
            return <HiddenInput name={name} value={currentValue.value !== undefined ? currentValue.value : currentValue} />
        }

        return currentValue.map((item, index) => {
            return <HiddenInput key={index} name={name} value={item.value !== undefined ? item.value : item} />
        });
    };

    return (
        <FormControl margin={margin} variant={variant} fullWidth={fullWidth} className={formControlClass} error={hasError}>
            <RenderHiddenInputs />
            <Label component={InputLabel} required={required} id={labelId} label={label} />
            <Select
                id={id}
                displayEmpty
                label={label}
                classes={classes}
                error={hasError}
                ref={componentRef}
                labelId={labelId}
                onOpen={() => setOpenedStatus(true)}
                onBlur={() => setOpenedStatus(false)}
                multiple={multiple}
                value={currentValue}
                onChange={handleChange}
                renderValue={selected => <RenderSelectedValues imagable={imagable} groupBy={groupBy} opened={opened} placeholder={placeholder} label={label} items={currentItems} selected={selected} />}
                children={selectItems(currentItems, groupBy, isLoading, imagable)}
                {...otherProps}
            />

            {hasError &&
                <FormHelperText error={hasError}>{error}</FormHelperText>
            }

        </FormControl>
    );
}

SelectInput.defaultProps = {
    id: Random.id(),
    labelId: Random.id(),
    value: '',
}