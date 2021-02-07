import PropTypes from 'prop-types';
import { InputRule } from '../validation/rules/input-rule';
import { TextFieldProps } from '@material-ui/core/TextField';
export declare type InputProps = TextFieldProps & {
    rules?: InputRule[];
    label?: string;
};
declare function FormInput(props: any): JSX.Element;
declare namespace FormInput {
    var propTypes: {
        required: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        placeholder: PropTypes.Requireable<string>;
        type: PropTypes.Validator<string>;
        name: PropTypes.Requireable<string>;
    };
    var defaultProps: {
        type: string;
        color: string;
        variant: any;
        rules: any;
    };
}
export default FormInput;
