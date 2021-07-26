import React from 'react';
import Label from './Label';
import Is from '@flk/supportive-is';
import config from './../../config';
import { Obj } from 'reinforcements';
import HiddenInput from './HiddenInput';
import { trans } from '../../localization';
import Avatar from '../../components/Avatar';
import useFormInput from '../hooks/useFormInput';
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { getItem, getItems } from '../utils/select-items';
import { getLocalizedText } from '../../localization/utils';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Checkbox, Chip, FormHelperText, styled } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { usePropDetector } from '../../hooks';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AvatarLabel = styled('span')({
    marginLeft: '0.4rem',
});

const filter = createFilterOptions();

function mapItemInternally(item) {
    if (Is.string(item)) {
        item = {
            label: trans(item),
            value: item,
        }
    } else if (Is.numeric(item)) {
        item = {
            label: item,
            value: item,
        };
    } else if (Is.object(item)) {
        let label = item.label || item.text || item.name || item.title;

        label = getLocalizedText(label);

        item = {
            ...item,
            label,
            value: item.value || item.id
        };
    }

    return item;
}

export default function AutoComplete(props: any) {
    const mapItems = items => {
        if (!items) return [];
        return items.map(mapItem);
    };

    const defaultMapResponse = response => {
        let items = response.data.records;
        return mapItems(items);
    };

    let {onError = null, label, limit, variant = config.get('form.input.variant', 'outlined'), disabled, except, request, loading: baseLoading, InputProps = {}, imageable, none, margin = 'normal', searchable, lazyLoading, groupBy, mapItem = mapItemInternally, addable = false, closeOnSelect, onChange, loadingText = trans('loading'), noOptionsText = trans('noOptions'), autoHighlight, items, name, value, multiple, required, mapResponse = defaultMapResponse, ...otherProps } = props;

    const [open, setOpen] = React.useState(false);

    const [exceptValues, setExceptValues] = React.useState(except);

    const [currentSearchText, setSearchText] = React.useState('');

    const [isLoading, setLoading] = React.useState(() => {
        if (!request) return false;

        if (!value && searchable) return false;

        return true;
    });

    const [currentItems, setItems] = React.useState(mapItems(items || []));

    const [loaded, requestIsLoaded] = React.useState(false);
    
    const adjustValue = value => {
        if ([null,undefined, ''].includes(value)) return multiple ? [] : '';

        if (Is.scalar(value) && Is.numeric(value)) {
            value = Number(value);
        }

        let itemValue = multiple ? getItems(currentItems, value) : getItem(currentItems, value);

        return itemValue || '';
    };

    const [error, setError] = React.useState(null);
    const [currentValue, setValue] = React.useState(adjustValue(value));
    // get the item object for the given value

    const formInput = useFormInput({
        name,
        value: currentValue,
        setError,
        onError,
        required,
    }, [currentValue]);

    const onSelection = (e, value, reason) => {
        if (!['remove-option', 'select-option', 'clear'].includes(reason)) return;

        if (addable) {
            if (Is.array(value)) {
                let lastItem = [].concat(value).pop();
                if (lastItem && !getItem(currentItems, lastItem.value)) {
                    setItems([mapItems(currentItems), lastItem]);
                }
            }
        }

        setValue(value);

        formInput.requiredValue(value);

        // set the item as an argument for the onChange event 
        onChange && onChange(value, currentValue); // second argument is old value
    }

    const hasError = Boolean(error);

    const checkNoneItem = ((items = currentItems) => {
        if (none && !items.find(item => item.none)) {
            // add none 
            const noneItem = {
                value: '',
                none: true,
                label: trans('none'),
            };

            setItems([noneItem, ...items]);
        }
    });

    const manageRequestResponse = response => {
        const items = mapResponse(response);

        setItems(items);

        requestIsLoaded(true);
        checkNoneItem(items);
        setLoading(false);

        if (value) {
            setValue(multiple ? getItems(items, value) : getItem(items, value));
        }
    };

    usePropDetector(setExceptValues, except);
    usePropDetector(setLoading, baseLoading);
    usePropDetector(setExceptValues, except, adjustValue);

    React.useEffect(() => {
        if (Is.undefined(items)) return;

        const mappedItems = mapItems(items);

        setItems(mappedItems);

        checkNoneItem();

        if (! Is.empty(value)) {
            setValue(multiple ? getItems(mappedItems, value) : getItem(mappedItems, value));
        }
    }, [items]);

    React.useEffect(() => {
        if (!request || loaded) return;

        if (Is.empty(value) && searchable) return;

        request(value, 'initial').then(manageRequestResponse);
    }, [loaded, value, searchable]);

    if (closeOnSelect === undefined) {
        closeOnSelect = multiple !== true;
    }

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

    let filterOptions = undefined;

    if (addable) {
        otherProps.selectOnFocus = true;
        otherProps.clearOnBlur = true;
        otherProps.handleHomeEndKeys = true;
        filterOptions = (options, params) => {
            const filtered = filter(options, params);

            // Suggest the creation of a new value
            if (addable && params.inputValue !== '') {
                filtered.push(mapItem(params.inputValue));
            }

            return filtered;
        };
    }

    const remoteSearch = e => {
        const searchText = e.target.value;
        setSearchText(searchText);
        if (!searchable || !request) return;

        if (!searchText || searchText === currentSearchText) return;

        setLoading(true);

        request(searchText, 'search').then(manageRequestResponse);
    };

    if (groupBy) {
        otherProps.groupBy = option => Is.callable(groupBy) ? groupBy(option) : Obj.get(option, groupBy);
    }

    if (multiple) {
        otherProps.renderOption = (option, { selected }) => {
            let label = option.label;

            if (imageable) {
                let imageKey = imageable === true ? 'image' : imageable;
                label = (
                    <>
                        <Avatar src={Obj.get(option, imageKey)} />
                        <AvatarLabel>{option.label}</AvatarLabel>
                    </>
                );
            }

            return (
                <React.Fragment>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        checked={selected}
                    />
                    {label}
                </React.Fragment>
            )
        };
    }

    const optionsList = !Is.empty(exceptValues) ? currentItems.filter(item => !exceptValues.includes(item.value)) : currentItems;

    return (
        <>
            <RenderHiddenInputs />
            <Autocomplete
                multiple={multiple}
                autoHighlight
                open={open}
                disableClearable={required}
                noOptionsText={noOptionsText}
                disableCloseOnSelect={!closeOnSelect}
                value={currentValue}
                getOptionDisabled={(item: any) => item.disabled === true || disabled || (limit && multiple && currentValue.length === limit)}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                options={optionsList}
                loadingText={loadingText}
                onChange={onSelection}
                loading={isLoading}
                filterOptions={filterOptions}
                renderTags={(value, getTagProps) => {
                    if (isLoading) return loadingText;

                    if (limit) {
                        value = value.slice(0, limit);
                    }

                    return value.map((option: any, index) => {
                        if (!option || !option.label) return null;

                        const imageKey = imageable === true ? 'image' : imageable;

                        const moreChipsProps: any = {};

                        if (imageKey) {
                            moreChipsProps.avatar = <Avatar src={Obj.get(option, imageKey)} />
                        }

                        return <Chip {...moreChipsProps} variant={variant} label={option.label} {...getTagProps({ index })} />
                    })
                }}
                getOptionSelected={(option: any, selectedValue: any) => {
                    if (!option || !selectedValue) return false;
                    return option.value === selectedValue.value;
                }}
                renderOption={(option: any) => {
                    if (imageable) {
                        let imageKey = imageable === true ? 'image' : imageable;
                        return (
                            <>
                                <Avatar src={Obj.get(option, imageKey)} />
                                <AvatarLabel>{option.label}</AvatarLabel>
                            </>
                        );
                    }

                    return option.label;
                }}
                getOptionLabel={(item: any) => {
                    // as item by all means can not be a scalar value
                    // if its scalar, then it means the items list is being lazy loaded.
                    if (Is.scalar(item)) return '';

                    return item.label;
                }}
                renderInput={(params: any) => {
                    return <TextField
                        {...params}
                        label={isLoading ? loadingText : <Label label={label} required={required} />}
                        variant={variant}
                        margin={margin}
                        error={hasError}
                        onChange={remoteSearch}
                        InputProps={{
                            ...params.InputProps,
                            ...InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />;
                }}
                {...otherProps}
            />
            <FormHelperText error={hasError}>{error}</FormHelperText>
        </>
    );
}

AutoComplete.defaultProps = {
    autoHighlight: true,
}