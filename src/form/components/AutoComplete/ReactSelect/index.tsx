import React from 'react'
import './index.scss';
import Label from '../../Label';
import { Obj } from 'reinforcements';
import BaseReactSelect from 'react-select'
import InputError from '../../InputError';
import Globals from '../../../../globals';
import useAutoComplete from '../../../hooks/useAutoComplete';
import { getSelectOptions } from '../../../utils/autocomplete-helpers';
import { AutoCompleteOption, AutoCompleteProps } from '../../../utils/types';
import HiddenInput from '../../HiddenInput';

function selectOptions(options: AutoCompleteOption[], props: AutoCompleteProps) {
    return options.map((option: AutoCompleteOption) => {
        let semanticOption = {
            key: option.value,
            label: option.text,
            value: String(option.value),
            disabled: Boolean(option.disabled),
        };

        // if (props.imageable) {
        //     let imageKey = props.imageable === true ? 'image' : props.imageable;

        //     semanticOption['image'] = {
        //         avatar: true,
        //         src: Obj.get(option, imageKey, defaultAvatarImage),
        //     };
        // }

        const returnedOption = Obj.merge(option, semanticOption);

        return returnedOption;
    });
}

export default function ReactSelect(props: AutoCompleteProps) {
    const { name, value, detectSearch, searchable, loadingMessage, onSelection, label, error, placeholder, required, clearable, options, multiple, noResultsMessage, closeOnSelect, disabled, loading } = useAutoComplete(props);

    const [optionsList, setOptions] = React.useState(selectOptions(options, props));

    React.useEffect(() => {
        setOptions(selectOptions(options, props));
    }, [options]);

    const onOptionSelection = (option) => {
        onSelection(multiple ? option.map(option => option.value) : option.value);
    };

    const onInputChange = (searchingText) => {
        detectSearch({
            target: {
                value: searchingText,
            }
        } as any);
    }

    return (
        <>
            {label && <Label required={required}>{label}</Label>}
            <InputError error={error} />
            <HiddenInput name={name} value={value} />
            <BaseReactSelect
                cacheOptions
                autoFocus={props.autoFocus}
                label={label}
                name={name}
                placeholder={placeholder}
                isDisabled={disabled}
                isLoading={loading}
                isMulti={multiple}
                isClearable={clearable}
                onChange={onOptionSelection}
                isSearchable={searchable}
                onInputChange={onInputChange}
                isRtl={Globals.direction === 'rtl'}
                closeMenuOnSelect={! multiple}
                options={optionsList}
                noOptionsMessage={() => noResultsMessage as string}
                getOptionValue={option => String(option.value)}
                getOptionLabel={option => option.label}
                value={getSelectOptions(value, optionsList, multiple) as any}
                loadingMessage={text => loadingMessage as string}
            />
        </>
    )
}
