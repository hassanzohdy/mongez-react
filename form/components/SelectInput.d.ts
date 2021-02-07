import { PropTypes } from '@material-ui/core';
export interface SelectProps {
    id?: string;
    label?: string;
    name?: string;
    groupBy?: string;
    classes?: any;
    fullWidth?: boolean;
    variant?: 'standard' | 'outlined' | 'filled';
    onChange?: Function;
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
    margin?: PropTypes.Margin;
    readOnly?: boolean;
    mapItem?: Function;
    none?: boolean;
    disabled?: boolean;
}
declare function SelectInput(props: SelectProps): JSX.Element;
declare namespace SelectInput {
    var defaultProps: {
        id: string;
        labelId: string;
        value: string;
    };
}
export default SelectInput;
