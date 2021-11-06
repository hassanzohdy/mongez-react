import React from 'react';
import config from '../../config';
import Is from '@flk/supportive-is';
import { AxiosResponse } from 'axios';
import { trans } from '../../localization';
import { usePropDetector } from '../../hooks';
import FormContext from '../Context/FormContext';
import { validateComponent } from '../utils/validator';
import { autoCompleteRules } from '../utils/rules-list';
import useFormInputRegistrar from './useFormInputRegistrar';
import { getSelectOptions, mapOption } from '../utils/autocomplete-helpers';
import { AutoCompleteHook, AutoCompleteOption, AutoCompleteProps } from '../utils/types';
import { useAutoCompleteRules, useError, useId, useLabel, useName, usePlaceholder, useValue } from './useFormInputProps';

function getCloseOnSelectValue(props: AutoCompleteProps) {
    if (props.closeOnSelect) return props.closeOnSelect;

    return props.multiple === false;
}

function getClearableValue(props: AutoCompleteProps) {
    if (!Is.undefined(props.clearable)) return props.clearable;

    return props.required === false;
}

function mapOptions(options, props) {
    return options.map(option => {
        let handler = props.mapOption || props.mapItem || mapOption;
        return handler(option);
    });
}

function useOptions(props: AutoCompleteProps) {
    const [options, setOptions] = React.useState(() => {
        const options = props.options || props.items;

        if (Is.empty(options)) return [];

        return mapOptions(options, props);
    });

    return [options, setOptions];
}

function useAutoProp(prop: any) {
    const [value, setValue] = React.useState<any>(prop);

    usePropDetector(setValue, prop);

    return value;
}

export default function useAutoComplete(props: AutoCompleteProps): AutoCompleteHook {
    // Contexts List
    const { form } = React.useContext(FormContext);

    // States List
    const multiple = useAutoProp(props.multiple);
    const [options, setOptions] = useOptions(props);
    const rules = useAutoCompleteRules(props);
    const [labelPosition] = React.useState(() => props.labelPosition || config.get('form.input.labelPosition', 'inline'));

    const [selectedOptions, setSelectedOptions] = React.useState<AutoCompleteOption | AutoCompleteOption[]>(null);

    const [closeOnSelect] = React.useState<boolean>(() => (
        getCloseOnSelectValue(props)
    ));

    const [clearable] = React.useState<boolean>(() => (
        getClearableValue(props)
    ));

    const id = useId(props);
    const name = useName(props);
    const label = useLabel(props);
    const placeholder = usePlaceholder(props);
    const [error, setError] = useError(props);

    const [noResultsMessage] = React.useState<React.ReactNode>(() => {
        if (!props.noResultsMessage) {
            return trans('noResults');
        } else if (Is.string(props.noResultsMessage)) {
            return trans(props.noResultsMessage as string);
        } else {
            return props.noResultsMessage;
        }
    });

    const [isLoading, setLoading] = React.useState<boolean>(() => {
        if (!Is.undefined(props.loading)) return props.loading;

        return !Is.undefined(props.request) && !props.lazyLoading;
    });

    const [loadingMessage] = React.useState<string>(() => (
        trans(props.loadingMessage as string || 'loading')
    ));

    const required = useAutoProp(props.required);

    const [disabled, disable] = React.useState(() => {
        return !Is.undefined(props.disabled) ? props.disabled : isLoading;
    });

    React.useEffect(() => {
        if (props.disabled === undefined) return;
        disable(props.disabled);
    }, [props.disabled]);

    React.useEffect(() => {
        if (props.loading === undefined) return;
        setLoading(props.loading);
        disable(props.loading);
    }, [props.loading]);

    const handleResponse = (response: AxiosResponse) => {
        const options: AutoCompleteOption[] = props.mapResponse(response);

        const uniqueValues = [];

        const mergedOptions = selectedOptions ? options.concat(multiple ? selectedOptions : [selectedOptions as AutoCompleteOption]) : options;

        const uniqueOptions = mapOptions(mergedOptions, props).filter(option => {
            const value = String(option.value);

            if (!uniqueValues.includes(value)) {
                uniqueValues.push(value);
                return true;
            }
            return false;
        });

        setOptions(uniqueOptions);
        setLoading(false);
        disable(Boolean(props.disabled));
    };

    const [value, setValue] = React.useState(() => {
        const incomingValue = props.value || props.defaultValue;

        if (multiple) return incomingValue ? incomingValue.map(String) : [];

        return incomingValue ? String(incomingValue) : '';
    }); const [currentSearchText, searchingText] = React.useState<string>('');

    // Effects
    React.useEffect(() => {
        if (!props.request) return;

        if (props.lazyLoading) return;

        props.request(value, 'initial').then(handleResponse);
    }, []);

    React.useEffect(() => {
        if (props.value === undefined || props.value === null) return;

        if (Is.empty(value) && Is.empty(props.value)) return;

        // onSelection(props.value);

        // let newValue = props.value;

        // newValue = multiple && props.limit ? newValue.slice(0, props.limit) : newValue;

        // setValue(multiple ? newValue.map(String) : String(newValue));

    }, [props.value]);

    React.useEffect(() => {
        if (props.options === undefined) return;

        const uniqueValues = [];

        const mergedOptions = selectedOptions ? props.options.concat(multiple ? selectedOptions : [selectedOptions as AutoCompleteOption]) : props.options;

        const uniqueOptions = mapOptions(mergedOptions, props).filter(option => {
            const value = String(option.value);

            if (!uniqueValues.includes(value)) {
                uniqueValues.push(value);
                return true;
            }
            return false;
        });

        setOptions(uniqueOptions);
    }, [props.options]);

    useFormInputRegistrar({
        id,
        name,
        rules,
        props,
        value,
        setError,
    });

    if (props.mapItem) {
        console.error(`Autocomplete 'mapItem' prop is deprecated, use 'mapOption instead'`);
    }

    const detectSearch = (e) => {
        const searchText = e.target.value;

        searchingText(searchText);

        props.onSearch && props.onSearch(searchText, currentSearchText);

        if (!searchText || searchText === currentSearchText) return;

        if (!props.searchable || !props.request) return;

        if (props.lazyLoading !== true) return;

        setLoading(true);

        setOptions(selectedOptions ? (multiple ? selectedOptions : [selectedOptions]) : []);

        props.request(searchText, 'search').then(handleResponse);
    };

    const onSelection = newValue => {
        newValue = multiple && props.limit ? newValue.slice(0, props.limit) : newValue;

        newValue = multiple ? newValue.map(String) : String(newValue);

        setValue(newValue);

        const newSelectedOptions = getSelectOptions(newValue, options, multiple);
        const oldSelectedOptions = getSelectOptions(value, options, multiple);

        setSelectedOptions(newSelectedOptions);
        props.onChange && props.onChange(newSelectedOptions, oldSelectedOptions);

        validateComponent({
            form,
            id,
            rules,
            value: newValue,
            props,
            setError,
        });
    };

    const returnedData = {
        clearable,
        closeOnSelect,
        required,
        disabled,
        loading: isLoading,
        multiple,
        noResultsMessage,
        options,
        value,
        setValue,
        label,
        labelPosition,
        placeholder,
        error,
        detectSearch,
        onSelection,
        name,
        id,
        limit: props.limit,
        loadingMessage,
        searchable: props.searchable,
        otherProps: {},
        classes: props.classes || {
            root: null,
            label: null,
        }
    };

    let returnedProps = Object.keys(returnedData);

    returnedProps.push('onChange');

    for (let key in props) {
        if (returnedProps.includes(key) === false) {
            returnedData.otherProps[key] = props[key];
        }
    }

    return returnedData;
}
