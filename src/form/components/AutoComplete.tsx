import React from 'react';
import Select from './AutoComplete/ReactSelect';
import { AutoCompleteProps } from '../utils/types';
import { mapResponse } from '../utils/autocomplete-helpers';
import SemanticSelect from './AutoComplete/SemanticSelect';
import MaterialSelect from './AutoComplete/MaterialSelect';

export default function AutoComplete(props: AutoCompleteProps) {
    if (props.theme === 'semantic') {
        return <SemanticSelect {...props} />
    } else if (props.theme === 'select') {
        return <Select {...props} />
    } else if (props.theme === 'material') {
        return <MaterialSelect {...props} />
    }
}

AutoComplete.defaultProps = {
    theme: 'semantic',
    multiple: false,
    required: false,
    searchable: true,
    mapResponse: mapResponse,
}