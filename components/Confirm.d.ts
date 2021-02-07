import PropTypes from 'prop-types';
import FormInput from './../form/components/FormInput';
declare function Confirm(props: any): JSX.Element;
declare namespace Confirm {
    var propTypes: {
        open: PropTypes.Validator<boolean>;
        title: PropTypes.Validator<string>;
        message: PropTypes.Validator<string>;
        onClose: PropTypes.Validator<(...args: any[]) => any>;
        onConfirm: PropTypes.Validator<(...args: any[]) => any>;
        confirmText: PropTypes.Validator<string>;
        closeText: PropTypes.Validator<string>;
    };
    var defaultProps: {
        title: any;
        confirmText: any;
        closeText: any;
        withInput: boolean;
        input: typeof FormInput;
    };
}
export default Confirm;
