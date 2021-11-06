import React from 'react'
import './index.scss';
import Label from '../../Label';
import { Obj } from 'reinforcements';
import InputError from '../../InputError';
import useAutoComplete from '../../../hooks/useAutoComplete';
import { AutoCompleteOption, AutoCompleteProps } from '../../../utils/types';
import HiddenValue from '../SemanticSelect/HiddenValue';
import { Autocomplete } from '@material-ui/lab';
import { Avatar, Chip, styled } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { getSelectOptions } from '../../../utils/autocomplete-helpers';
import HiddenInput from '../../HiddenInput';


const AvatarLabel = styled('span')({
    marginLeft: '0.4rem',
});

function selectOptions(options: AutoCompleteOption[], props: AutoCompleteProps) {
    return options.map((option: AutoCompleteOption) => {
        let semanticOption = {
            key: option.value,
            label: option.text,
            value: String(option.value),
            disabled: Boolean(option.disabled),
        };

        const returnedOption = Obj.merge(option, semanticOption);

        return returnedOption;
    });
}

export default function MaterialSelect(props: AutoCompleteProps) {
    const { name, limit, value, detectSearch, loadingMessage, onSelection, label, error, placeholder, required, clearable, options, multiple, noResultsMessage, closeOnSelect, disabled, loading } = useAutoComplete(props);

    const [optionsList, setOptions] = React.useState(selectOptions(options, props));

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOptions(selectOptions(options, props));
    }, [options]);

    const onOptionSelection = (e, option) => {
        onSelection(multiple ? option.map(option => option.value || option) : option.value);
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
            {/* {label && <Label required={required}>{label}</Label>} */}
            <InputError error={error} />
            <HiddenInput name={name} value={value} />
            <Autocomplete
                multiple={multiple}
                autoHighlight
                open={open}
                disableClearable={clearable}
                disableCloseOnSelect={!closeOnSelect}
                noOptionsText={noResultsMessage}
                loadingText={loadingMessage}
                loading={loading}
                value={value}
                getOptionDisabled={(option: any) => option.disabled === true || disabled || (limit && multiple && (value as any[]).length === limit)}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                options={optionsList}
                onChange={onOptionSelection}
                renderTags={(value, getTagProps) => {
                    if (loading) return loadingMessage;

                    if (limit) {
                        value = value.slice(0, limit);
                    }

                    return (getSelectOptions(value, optionsList, true) as AutoCompleteOption[]).map((option: any, index) => {
                        if (!option || !option.label) return null;

                        const imageKey = props.imageable === true ? 'image' : props.imageable;

                        const moreChipsProps: any = {};

                        if (imageKey) {
                            moreChipsProps.avatar = <Avatar src={Obj.get(option, imageKey)} />
                        }

                        return <Chip {...moreChipsProps} label={option.label} {...getTagProps({ index })} />
                    })
                }}
                getOptionSelected={(option: any, selectedValue: any) => {
                    if (!option || !selectedValue) return false;

                    return String(option.value) === String(selectedValue);
                }}
                renderOption={(option: any) => {
                    if (props.imageable) {
                        let imageKey = props.imageable === true ? 'image' : props.imageable;
                        return (
                            <>
                                <Avatar src={Obj.get(option, imageKey)} />
                                <AvatarLabel>{option.label}</AvatarLabel>
                            </>
                        );
                    }

                    return option.label;
                }}
                getOptionLabel={(item: any) => item.label}
                renderInput={(params: any) => {
                    return <TextField
                        {...params}
                        label={loading ? loadingMessage : <Label label={label} required={required} />}
                        error={Boolean(error)}
                        onChange={onInputChange}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />;
                }}
            />
        </>
    )
}
