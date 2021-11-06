import './index.scss';
import clsx from 'clsx';
import React from 'react';
import Label from '../../Label';
import { Obj } from 'reinforcements';
import InputError from '../../InputError';
import useAutoComplete from '../../../hooks/useAutoComplete';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react'
import { AutoCompleteOption, AutoCompleteProps } from '../../../utils/types';
import SemanticInputStyle from './../../FormInput/SemanticInput/index.module.scss';
import HiddenInput from '../../HiddenInput';

const defaultAvatarImage = 'https://react.semantic-ui.com/images/wireframe/square-image.png';

function optionsToSemantic(options: AutoCompleteOption[], props: AutoCompleteProps): DropdownItemProps[] {
    return options.map((option: AutoCompleteOption, index: number) => {
        let semanticOption: DropdownItemProps = {
            key: option.value,
            text: option.text,
            value: String(option.value),
            disabled: Boolean(option.disabled),
        };

        const returnedOption = Obj.merge(option, semanticOption);

        if (props.imageable) {
            let imageKey = props.imageable === true ? 'image' : props.imageable;

            semanticOption.image = {
                avatar: true,
                wrapped: true,
                size: 'tiny',
                circular: true,
                src: Obj.get(option, imageKey, props.defaultImage || defaultAvatarImage),
            };
        } else {
            delete returnedOption.image;
        }

        if (props.components && props.components.option) {
            const Component = props.components.option;

            returnedOption.content = <Component index={index} option={option} />
        }

        if (returnedOption.label) {
            delete returnedOption.label;
        }

        return returnedOption;
    });
}

export default function SemanticSelect({ limitDisplay = null, defaultOpen = false, ...props }: AutoCompleteProps) {
    const [open, setOpen] = React.useState(defaultOpen);

    const { name, value, classes, id, detectSearch,
        searchable, onSelection, label, labelPosition, error, placeholder,
        required, clearable, options, multiple, noResultsMessage, closeOnSelect,
        disabled, loading, otherProps } = useAutoComplete(props);

    const [optionsList, setOptions] = React.useState<DropdownItemProps[]>(() => {
        let newOptions = optionsToSemantic(options, props);

        if (limitDisplay) {
            newOptions = newOptions.slice(0, limitDisplay);
        }

        return newOptions
    });

    const labelClass = React.useMemo(() => {
        return clsx('semantic-dropdown-label', classes.label, {
            'ui label inline': labelPosition === 'inline',
            [SemanticInputStyle.inlineLabel]: labelPosition === 'inline',
        });
    }, []);

    if (props.defaultOpen) {
        delete props.defaultOpen;
    }

    React.useEffect(() => {
        let newOptions = optionsToSemantic(options, props);
        if (limitDisplay) {
            newOptions = newOptions.slice(0, limitDisplay);
        }

        setOptions(newOptions);
    }, [options, limitDisplay]);

    const onOptionSelection = (e, config) => {
        const newValue = config.value;

        onSelection(newValue);
    };

    const LabelComponent = props.LabelComponent || (props.components && props.components.label) || Label;

    return (
        <>
            <InputError error={error} />
            <div className={clsx('ui form mini', {
                dropdownInlineRoot: labelPosition === 'inline',
            }, classes.root)}>
                {label && <LabelComponent htmlFor={id} onClick={() => setOpen(!open)}
                    className={props.LabelComponent ? 'select-label-top' : labelClass + ' select-label-top'} required={required}>{label}</LabelComponent>}

                <HiddenInput name={name} value={value} />

                <Dropdown
                    searchInput={{ autoFocus: props.autoFocus }}
                    clearable={clearable}
                    disabled={disabled}
                    closeOnChange={closeOnSelect}
                    fluid
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    className={classes.root}
                    error={Boolean(error)}
                    selection
                    id={id}
                    loading={loading}
                    search={searchable}
                    multiple={multiple}
                    noResultsMessage={noResultsMessage}
                    options={optionsList}
                    selectOnBlur={false}
                    value={value}
                    placeholder={placeholder as string}
                    {...otherProps}
                    onChange={onOptionSelection}
                    onSearchChange={detectSearch}
                />
            </div>
        </>
    )
}
