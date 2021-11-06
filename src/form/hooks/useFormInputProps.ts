import React from 'react';
import config from "../../config";
import Is from '@flk/supportive-is';
import { trans } from '../../localization';
import { Random, toInputName } from "reinforcements";
import { autoCompleteRules, fileInputRules, InputRule, rulesList } from '..';
import required from '../validation/rules/required';

export function useLabel(props) {
    const [label] = React.useState(() => {
        if (!props.label) return '';

        return Is.string(props.label) ? trans(props.label as string) : props.label;
    });

    return label;
}

export function usePlaceholder(props) {
    const [placeholder] = React.useState(() => props.placeholder ? trans(props.placeholder) : '');

    return placeholder;
}

export function useName(props) {
    const [name] = React.useState(() => toInputName(props.name || ''));

    return name;
}

export function useId(props) {
    const id = React.useMemo(() => toInputName(props.id || Random.id()), [props.id]);

    return id;
}

export function useValue<T>(props, initialValue = '') {
    const [value, setValue] = React.useState<T>(() => {
        return props.value || props.defaultValue || initialValue || '';
    });

    return [value, setValue];
}

export function useError(props): [string, Function, boolean] {
    const [error, errorUpdater] = React.useState<string>('');

    const hasError: boolean = Boolean(error);

    return [error, (error) => {
        errorUpdater(error);
        props.onError && props.onError(error);
    }, hasError];
}

export function useRules(props: any, configRulesKey: string, defaultRules: InputRule[]): InputRule[] {
    const [rules] = React.useState(() => props.rules || config.get('form.input.rules.' + configRulesKey, defaultRules));

    return rules;
}

export function useBasicRules(props) {
    return useRules(props, 'list', [required]);
}

export function useInputRules(props) {
    return useRules(props, 'list', rulesList);
}

export function useAutoCompleteRules(props) {
    return useRules(props, 'autoComplete', autoCompleteRules);
}

export function useFileRules(props) {
    return useRules(props, 'file', fileInputRules);
}